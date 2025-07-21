import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/GestionInventario.css';

// Interfaz para Materiales
interface Material {
  id: number;
  tela: string;
  color: string;
  costo: number;
}

// Interfaz para Prendas
interface Prenda {
  id: number;
  tipo: string;
  talla: string;
}

const GestionInventario: React.FC = () => {
  const navigate = useNavigate();

  // Estados separados para materiales y prendas
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [prendas, setPrendas] = useState<Prenda[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventario = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Acceso denegado. Por favor, inicie sesión.');
        setIsLoading(false);
        return;
      }

      try {
        // Hacemos ambas peticiones en paralelo para más eficiencia
        const [materialesRes, prendasRes] = await Promise.all([
          fetch('http://localhost:4000/api/materiales/mis-materiales', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch('http://localhost:4000/api/prendas', { // Prendas es público por ahora
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!materialesRes.ok) throw new Error('Error al cargar los materiales.');
        if (!prendasRes.ok) throw new Error('Error al cargar las prendas.');

        const materialesData = await materialesRes.json();
        const prendasData = await prendasRes.json();

        setMateriales(materialesData);
        setPrendas(prendasData);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInventario();
  }, []);

  const eliminarMaterial = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este material?')) return;

    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`http://localhost:4000/api/materiales/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('No se pudo eliminar el material.');

      setMateriales(materiales.filter(m => m.id !== id));
      alert('Material eliminado.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const eliminarPrenda = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta prenda?')) return;

    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`http://localhost:4000/api/prendas/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('No se pudo eliminar la prenda.');

      setPrendas(prendas.filter(p => p.id !== id));
      alert('Prenda eliminada.');
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (isLoading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando inventario...</div>;
  if (error) return <div style={{ textAlign: 'center', color: 'red', padding: '2rem' }}>Error: {error}</div>;

  return (
      <div style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '4.5rem' }}>
        <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(35,35,35,0.10)', padding: '2.5rem 2.2rem', maxWidth: 980, width: '100%' }}>
          <h1 style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#232323', margin: 0, letterSpacing: '1px', textAlign: 'center', marginBottom: '2.2rem' }}>Gestión de inventario</h1>
          <main style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>

            {/* --- SECCIÓN DE MATERIALES --- */}
            <section style={{ flex: 1, minWidth: 320, textAlign: 'center' }}>
              <h2 style={{ color: '#232323', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1.2rem' }}>Materiales</h2>
              <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {materiales.map(m => (
                    <div key={m.id} style={{ background: '#f5f5f5', borderRadius: 12, padding: '1.2rem 1.1rem', minWidth: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(35,35,35,0.06)' }}>
                      <p style={{ color: '#232323', fontWeight: 600, margin: '0 0 10px 0' }}>{m.tela} {m.color}</p>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button className="edna-btn" style={{padding: '5px 10px', fontSize: '0.9rem'}} onClick={() => navigate(`/editar-material/${m.id}`)}>Editar</button>
                        <button className="edna-btn" style={{padding: '5px 10px', fontSize: '0.9rem', background: '#dc3545', borderColor: '#dc3545', color: 'white'}} onClick={() => eliminarMaterial(m.id)}>Eliminar</button>
                      </div>
                    </div>
                ))}
                <div style={{ background: '#e0e0e0', borderRadius: 12, padding: '1.2rem 1.1rem', minWidth: 160, minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed #cccccc' }} onClick={() => navigate('/nuevo-material')}>
                  <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>+</span>
                  <span>Añadir material</span>
                </div>
              </div>
            </section>

            {/* --- SECCIÓN DE PRENDAS --- */}
            <section style={{ flex: 1, minWidth: 320, textAlign: 'center' }}>
              <h2 style={{ color: '#232323', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1.2rem' }}>Prendas</h2>
              <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {prendas.map(p => (
                    <div key={p.id} style={{ background: '#f5f5f5', borderRadius: 12, padding: '1.2rem 1.1rem', minWidth: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(35,35,35,0.06)' }}>
                      <p style={{ color: '#232323', fontWeight: 600, margin: '0 0 10px 0' }}>{p.tipo} (Talla: {p.talla})</p>
                      <div style={{ display: 'flex', gap: 10 }}>
                        <button className="edna-btn" style={{padding: '5px 10px', fontSize: '0.9rem'}}>Editar</button>
                        <button className="edna-btn" style={{padding: '5px 10px', fontSize: '0.9rem', background: '#dc3545', borderColor: '#dc3545', color: 'white'}} onClick={() => eliminarPrenda(p.id)}>Eliminar</button>
                      </div>
                    </div>
                ))}
                <div style={{ background: '#e0e0e0', borderRadius: 12, padding: '1.2rem 1.1rem', minWidth: 160, minHeight: 120, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px dashed #cccccc' }} onClick={() => navigate('/nuevo-diseno')}>
                  <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>+</span>
                  <span>Agregar nuevo diseño</span>
                </div>
              </div>
            </section>
          </main>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
          <button className="edna-btn" style={{ minWidth: 180 }}>
            Guardar
          </button>
        <button
            className="edna-btn"
            style={{ minWidth: 180 }}
            onClick={() => navigate('/Diseñador')}
          >
            ↩ Volver
        </button>
        </div>
        
      </div>
  );
};

export default GestionInventario;
