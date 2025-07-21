import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/FormularioDiseno.css';

// Interfaces para los datos que cargaremos desde el backend
interface Prenda {
  id: number;
  tipo: string;
}
interface Material {
  id: number;
  tela: string;
  color: string;
}

const FormularioDiseno: React.FC = () => {
  const navigate = useNavigate();

  // Estados para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [prendaId, setPrendaId] = useState('');
  const [talla, setTalla] = useState('xxs');
  const [color, setColor] = useState('#ff0000');
  const [coloresSeleccionados, setColoresSeleccionados] = useState<string[]>([]);
  const [materialId, setMaterialId] = useState('');
  const [costo, setCosto] = useState('');

  // Estados para almacenar los datos de los selectores y manejar la carga/errores
  const [prendas, setPrendas] = useState<Prenda[]>([]);
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect se ejecuta una vez cuando el componente se carga
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Hacemos las peticiones para obtener prendas y materiales en paralelo
        const [prendasRes, materialesRes] = await Promise.all([
          fetch('http://localhost:4000/api/prendas'),
          fetch('http://localhost:4000/api/materiales')
        ]);

        if (!prendasRes.ok) throw new Error('Error al cargar las prendas');
        if (!materialesRes.ok) throw new Error('Error al cargar los materiales');

        const prendasData = await prendasRes.json();
        const materialesData = await materialesRes.json();

        setPrendas(prendasData);
        setMateriales(materialesData);

        // Establecemos un valor por defecto para los selectores si hay datos
        if (prendasData.length > 0) setPrendaId(prendasData[0].id.toString());
        if (materialesData.length > 0) setMaterialId(materialesData[0].id.toString());

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []); // El array vacío asegura que solo se ejecute una vez

  const agregarColor = () => {
    if (color && !coloresSeleccionados.includes(color)) {
      setColoresSeleccionados([...coloresSeleccionados, color]);
    }
  };

  const handleConfirmar = async () => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
      alert("Debes iniciar sesión para crear un diseño.");
      return;
    }
    if (!nombre || !prendaId || !materialId || !talla || !costo) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/disenos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre,
          talla,
          colores: coloresSeleccionados,
          costo: parseFloat(costo),
          prenda_id: parseInt(prendaId),
          material_id: parseInt(materialId),
          usuario_id: parseInt(userId)
          // Los campos 'logo' e 'imagen' se pueden añadir aquí si se manejan
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al crear el diseño.");
      }

      alert("¡Diseño creado exitosamente!");
      navigate('/diseñosguardados');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (isLoading) return <div style={{textAlign: 'center', padding: '2rem'}}>Cargando formulario...</div>;
  if (error) return <div style={{textAlign: 'center', color: 'red', padding: '2rem'}}>Error: {error}</div>;

  return (
      <div style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', padding: '2rem' }}>
        <h1 style={{ textAlign: 'center' }}>Diseño</h1>
        <main style={{ display: 'flex', gap: '2rem', maxWidth: '900px', margin: 'auto' }}>
          <div style={{ flex: 1 }}>
            {/* Aquí puedes añadir la lógica para la previsualización de la imagen */}
            <div style={{ border: '2px dashed #ccc', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <span>Cargar imagen</span>
            </div>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>&lt; {nombre || 'Nombre del Diseño'} &gt;</p>
          </div>
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label>Nombre: <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} style={{width: '100%', padding: '8px'}} /></label>

            <label>Tipo de prenda:
              <select value={prendaId} onChange={e => setPrendaId(e.target.value)} style={{width: '100%', padding: '8px'}}>
                {prendas.map(p => <option key={p.id} value={p.id}>{p.tipo}</option>)}
              </select>
            </label>

            <label>Talla:
              <select value={talla} onChange={e => setTalla(e.target.value)} style={{width: '100%', padding: '8px'}}>
                <option value="xxs">xxs</option>
                <option value="xs">xs</option>
                <option value="s">s</option>
                <option value="m">m</option>
                <option value="l">l</option>
                <option value="xl">xl</option>
                <option value="xxl">xxl</option>
              </select>
            </label>

            <label>Color(es):
              <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <input type="color" value={color} onChange={e => setColor(e.target.value)} />
                <button onClick={agregarColor}>Añadir</button>
              </div>
              <div style={{display: 'flex', gap: '5px', marginTop: '5px'}}>
                {coloresSeleccionados.map((c, i) => <div key={i} style={{ width: '24px', height: '24px', backgroundColor: c, border: '1px solid #ccc' }} title={c} />)}
              </div>
            </label>

            <label>Tipo de tela:
              <select value={materialId} onChange={e => setMaterialId(e.target.value)} style={{width: '100%', padding: '8px'}}>
                {materiales.map(m => <option key={m.id} value={m.id}>{m.tela}</option>)}
              </select>
            </label>

            <label>Costo: <input type="number" value={costo} onChange={e => setCosto(e.target.value)} style={{width: '100%', padding: '8px'}} /></label>

            <div style={{ textAlign: 'right', marginTop: '1rem' }}>
              <button className="edna-btn" onClick={handleConfirmar}>Confirmar ➤</button>
            </div>
          </div>
        </main>
      </div>
  );
};

export default FormularioDiseno;
