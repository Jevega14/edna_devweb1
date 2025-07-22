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
          fetch('http://localhost:4000/api/prendas', {
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
      <div style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', background: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '4.5rem' }}>
        <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(35,35,35,0.10)', padding: '2.5rem 2.2rem', maxWidth: 980, width: '100%' }}>
          <h1 style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#232323', margin: 0, letterSpacing: '1px', textAlign: 'center', marginBottom: '2.2rem' }}>Gestión de inventario</h1>
          <main style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>

            {/* --- SECCIÓN DE MATERIALES --- */}
            <section style={{ flex: 1, minWidth: 320, textAlign: 'center' }}>
              <h2 style={{ color: '#232323', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1.2rem' }}>Materiales</h2>
              <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {materiales.map(m => (
                    <div key={m.id} className="inventory-card">
                      <p className="inventory-card-title">{m.tela} {m.color}</p>
                      <div className="inventory-card-actions">
                        <button className="edna-btn-small" onClick={() => navigate(`/editar-material/${m.id}`)}>Editar</button>
                        <button className="edna-btn-small edna-btn-danger" onClick={() => eliminarMaterial(m.id)}>Eliminar</button>
                      </div>
                    </div>
                ))}
                <div className="inventory-card-add" onClick={() => navigate('/nuevo-material')}>
                  <span className="add-icon">+</span>
                  <span>Añadir material</span>
                </div>
              </div>
            </section>

            {/* --- SECCIÓN DE PRENDAS --- */}
            <section style={{ flex: 1, minWidth: 320, textAlign: 'center' }}>
              <h2 style={{ color: '#232323', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1.2rem' }}>Prendas</h2>
              <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {prendas.map(p => (
                    <div key={p.id} className="inventory-card">
                      <p className="inventory-card-title">{p.tipo} (Talla: {p.talla})</p>
                      <div className="inventory-card-actions">
                        <button className="edna-btn-small">Editar</button>
                        <button className="edna-btn-small edna-btn-danger" onClick={() => eliminarPrenda(p.id)}>Eliminar</button>
                      </div>
                    </div>
                ))}
                {/* --- BOTÓN CORREGIDO --- */}
                <div className="inventory-card-add" onClick={() => navigate('/nueva-prenda')}>
                  <span className="add-icon">+</span>
                  <span>Agregar nueva prenda</span>
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* --- BOTÓN PRINCIPAL PARA CREAR DISEÑO --- */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <button className="edna-btn edna-btn-primary" style={{padding: '12px 24px', fontSize: '1.1rem'}} onClick={() => navigate('/nuevo-diseno-admin')}>
            Crear Nuevo Diseño (Combinar)
          </button>
        </div>

      </div>
  );
};

export default GestionInventario;