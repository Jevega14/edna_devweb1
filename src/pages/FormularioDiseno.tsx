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
  const [tipoPrenda, setTipoPrenda] = useState('');
  const [coloresSeleccionados, setColoresSeleccionados] = useState<string[]>([]);
  const [imagen, setImagen] = useState<string | null>(null);
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

  const manejarArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (archivo) {
      const lector = new FileReader();
      lector.onloadend = () => {
        if (lector.result) {
          setImagen(lector.result as string);
        }
      };
      lector.readAsDataURL(archivo);
    }
  };

  const agregarColor = () => {
    if (color && !coloresSeleccionados.includes(color)) {
      setColoresSeleccionados([...coloresSeleccionados, color]);
    }
  };

  const handleConfirmar = async () => {
    const token = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
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
          tipo_prenda: prendaId,
          talla,
          colores: coloresSeleccionados,
          costo: parseFloat(costo),
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
        <h1 style={{ textAlign: 'center' }}>Diseño de la prenda</h1>
        <main style={{ display: 'flex', gap: '2rem', maxWidth: '900px', margin: 'auto' }}>
          <div style={{ flex: 1 }}>
            {/* Aquí puedes añadir la lógica para la previsualización de la imagen */}

            <label
  htmlFor="cargar-imagen"
  style={{
    border: '2px dashed #ccc',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    cursor: 'pointer',
    backgroundColor: imagen ? 'transparent' : '#f0f0f0',
  }}
            >
              {imagen ? (
                <img
                  src={imagen}
                  alt="Imagen cargada"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <span>Cargar imagen</span>
              )}
            </label>
            <input
              id="cargar-imagen"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={manejarArchivo}
            />

            <p style={{ textAlign: 'center', marginTop: '1rem' }}>&lt; {nombre || 'Nombre de la prenda'} &gt;</p>
          </div>
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label>Nombre: <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} style={{width: '100%', padding: '8px'}} /></label>

            <label>Tipo de prenda:
              <select value={prendaId} onChange={e => setPrendaId(e.target.value)} style={{width: '100%', padding: '8px'}}>
                {prendas.map(p => <option key={p.id} value={p.id}>{p.tipo}</option>)}
                <option value="Sombrero">Sombrero</option>
                <option value="Gorra">Gorra</option>
                <option value="Collar">Collar</option>
                <option value="Máscara">Máscara</option>
                <option value="Corbata">Corbata</option>
                <option value="Pañoleta">Pañoleta</option>
                <option value="Guantes">Guantes</option>
                <option value="Capa">Capa</option>
                <option value="Escudo">Escudo</option>
                <option value="Sueter">Sueter</option>
                <option value="Camisa">Camisa</option>
                <option value="Vestido">Vestido</option>
                <option value="Cinturón">Cinturón</option>
                <option value="Falda">Falda</option>
                <option value="Minifalda">Minifalda</option>
                <option value="Pantalón">Pantalón</option>
                <option value="Jogger">Jogger</option>
                <option value="Zapatos">Zapatos</option>
                <option value="Tenis">Tenis</option>
                <option value="Botas">Botas</option>
                <option value="Tacones">Tacones</option>
                <option value="Medias">Medias</option>
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
              <button
                className="edna-btn boton-confirmar"
                onClick={handleConfirmar}
              >
                Confirmar ➤
              </button>
            </div>
          </div>
        </main>
      </div>
  );
};

export default FormularioDiseno;
