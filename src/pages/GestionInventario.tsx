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

  if (isLoading) return <div className="loading-message">Cargando inventario...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
      <div className="inventory-page">
        <div className="inventory-container">
          <h1 className="inventory-title">Gestión de inventario</h1>
          <main className="inventory-main">

            {/* --- SECCIÓN DE MATERIALES --- */}
            <section className="inventory-section">
              <h2 className="section-title">Materiales</h2>
              <div className="items-grid">
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
            <section className="inventory-section">
              <h2 className="section-title">Prendas</h2>
              <div className="items-grid">
                {prendas.map(p => (
                    <div key={p.id} className="inventory-card">
                      <p className="inventory-card-title">{p.tipo} (Talla: {p.talla})</p>
                      <div className="inventory-card-actions">
                        <button className="edna-btn-small">Editar</button>
                        <button className="edna-btn-small edna-btn-danger" onClick={() => eliminarPrenda(p.id)}>Eliminar</button>
                      </div>
                    </div>
                ))}
                <div className="inventory-card-add" onClick={() => navigate('/nueva-prenda')}>
                  <span className="add-icon">+</span>
                  <span>Agregar nueva prenda</span>
                </div>
              </div>
            </section>
          </main>
        </div>

        <div className="main-action-container">
          <button className="edna-btn edna-btn-primary" onClick={() => navigate('/nuevo-diseno-admin')}>
            Crear Nuevo Diseño (Combinar)
          </button>
        </div>

      </div>
  );
};

export default GestionInventario;
