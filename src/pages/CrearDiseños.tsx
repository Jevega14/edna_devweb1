import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CrearDiseños.css';

// Interfaces para los datos que cargaremos del backend
interface Prenda {
  id: number;
  tipo: string;
  talla: string;
  precio: number;
  logo?: string;
  imagen?: string;
}
interface Material {
  id: number;
  tela: string;
  color: string;
}

// Interfaz para cada fila de nuestro diseño/pedido
export interface LineaDiseño {
  id: number; // Un ID único para la fila en el frontend
  prendaId: string;
  materialId: string;
  talla: string;
  costo: number;
}

const CrearDiseños: React.FC = () => {
  const navigate = useNavigate();

  // Estados para el inventario disponible
  const [prendas, setPrendas] = useState<Prenda[]>([]);
  const [materiales, setMateriales] = useState<Material[]>([]);

  // Estado para las líneas del diseño que el usuario va creando
  const [lineasDiseño, setLineasDiseño] = useState<LineaDiseño[]>([]);
  const [nombreDiseño, setNombreDiseño] = useState(''); // Estado para el nombre del diseño

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar prendas y materiales del backend al iniciar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prendasRes, materialesRes] = await Promise.all([
          fetch('http://localhost:4000/api/prendas'),
          fetch('http://localhost:4000/api/materiales')
        ]);
        if (!prendasRes.ok || !materialesRes.ok) throw new Error('No se pudo cargar el inventario.');

        const prendasData = await prendasRes.json();
        const materialesData = await materialesRes.json();

        setPrendas(prendasData);
        setMateriales(materialesData);
      } catch (err: any) { setError(err.message); }
      finally { setIsLoading(false); }
    };
    fetchData();
  }, []);

  // Función para añadir una nueva fila a la tabla
  const añadirLinea = () => {
    if (prendas.length === 0 || materiales.length === 0) {
      alert("No hay prendas o materiales disponibles para crear un diseño.");
      return;
    }
    const prendaPorDefecto = prendas[0];
    const materialPorDefecto = materiales[0];

    const nuevaLinea: LineaDiseño = {
      id: Date.now(),
      prendaId: prendaPorDefecto.id.toString(),
      materialId: materialPorDefecto.id.toString(),
      talla: prendaPorDefecto.talla,
      costo: Number(prendaPorDefecto.precio) || 0,
    };
    setLineasDiseño([...lineasDiseño, nuevaLinea]);
  };

  // Función para actualizar una línea cuando el usuario cambia una selección
  const actualizarLinea = (id: number, campo: keyof LineaDiseño, valor: any) => {
    setLineasDiseño(lineasDiseño.map(linea => {
      if (linea.id === id) {
        const updatedLinea = { ...linea, [campo]: valor };

        if (campo === 'prendaId') {
          const prendaSeleccionada = prendas.find(p => p.id === parseInt(valor));
          if(prendaSeleccionada) {
            updatedLinea.costo = Number(prendaSeleccionada.precio) || 0;
            updatedLinea.talla = prendaSeleccionada.talla;
          }
        }
        return updatedLinea;
      }
      return linea;
    }));
  };

  // Función para guardar el diseño en localStorage
  const guardarDiseño = () => {
    if (lineasDiseño.length === 0) {
      alert("Debes añadir al menos una prenda para guardar el diseño.");
      return;
    }
    if (!nombreDiseño.trim()) {
      alert("Por favor, dale un nombre a tu diseño.");
      return;
    }

    const diseñosGuardados = JSON.parse(localStorage.getItem('savedDesigns') || '[]');
    const nuevoDiseñoGuardado = {
      id: Date.now(),
      nombre: nombreDiseño,
      lineas: lineasDiseño,
      costoTotal: costoTotal
    };
    diseñosGuardados.push(nuevoDiseñoGuardado);
    localStorage.setItem('savedDesigns', JSON.stringify(diseñosGuardados));

    alert(`Diseño "${nombreDiseño}" guardado exitosamente.`);
    navigate('/diseñosguardados');
  };

  const costoTotal = lineasDiseño.reduce((total, linea) => total + (linea.costo || 0), 0);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div className="crear-diseno-container">
        <header className="crear-diseno-header">
          <h1>Crear diseño</h1>
        </header>
        <main className="crear-diseno-main">
          <div className="tabla-diseno">
            <table>
              <thead>
              <tr>
                <th>Vista</th>
                <th>Tipo</th>
                <th>Color</th>
                <th>Tela</th>
                <th>Talla</th>
                <th>Logo</th>
                <th>Costo</th>
              </tr>
              </thead>
              <tbody>
              {lineasDiseño.map(linea => {
                const prendaSeleccionada = prendas.find(p => p.id === parseInt(linea.prendaId));
                const materialSeleccionado = materiales.find(m => m.id === parseInt(linea.materialId));
                return (
                    <tr key={linea.id}>
                      <td><img src={prendaSeleccionada?.imagen ? `http://localhost:4000${prendaSeleccionada.imagen}` : 'https://placehold.co/60x60/EEE/333?text=Prenda'} alt="vista" className="vista-prenda" /></td>
                      <td>
                        <select value={linea.prendaId} onChange={(e) => actualizarLinea(linea.id, 'prendaId', e.target.value)}>
                          {prendas.map(p => <option key={p.id} value={p.id}>{p.tipo}</option>)}
                        </select>
                      </td>
                      <td>
                        <div className="color-display">
                          <div className="color-swatch" style={{ backgroundColor: materialSeleccionado?.color || '#ccc' }}></div>
                          <span>{materialSeleccionado?.color}</span>
                        </div>
                      </td>
                      <td>
                        <select value={linea.materialId} onChange={(e) => actualizarLinea(linea.id, 'materialId', e.target.value)}>
                          {materiales.map(m => <option key={m.id} value={m.id}>{m.tela}</option>)}
                        </select>
                      </td>
                      <td>
                        <select value={linea.talla} onChange={(e) => actualizarLinea(linea.id, 'talla', e.target.value)}>
                          <option>XXS</option><option>S</option><option>M</option><option>L</option><option>XL</option>
                        </select>
                      </td>
                      <td><img src={prendaSeleccionada?.logo ? `http://localhost:4000${prendaSeleccionada.logo}` : 'https://placehold.co/40x40/EEE/333?text=Logo'} alt="logo" className="vista-logo" /></td>
                      <td>${(linea.costo || 0).toFixed(2)}</td>
                    </tr>
                )
              })}
              </tbody>
            </table>
          </div>
          <button onClick={añadirLinea} className="btn-accion btn-añadir-linea">+ Añadir prenda/diseño</button>
          <div className="acciones-finales">
            <div className="nombre-diseno-input">
              <label htmlFor="nombreDiseño">Nombre del Diseño:</label>
              <input
                  type="text"
                  id="nombreDiseño"
                  value={nombreDiseño}
                  onChange={(e) => setNombreDiseño(e.target.value)}
                  placeholder="Ej: Conjunto de verano"
              />
            </div>
            <div className="costo-total">
              <strong>Costo Total: ${costoTotal.toFixed(2)}</strong>
            </div>
            <button onClick={guardarDiseño} className="btn-accion btn-principal">Guardar diseño</button>
          </div>
        </main>
      </div>
  );
};

export default CrearDiseños;
