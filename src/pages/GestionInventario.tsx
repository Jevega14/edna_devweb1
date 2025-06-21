<<<<<<< HEAD
import React from 'react';
import './GestionInventario.css';

const GestionInventario: React.FC = () => {
  return (
    <div className="inventario-container">
      <header className="inventario-header">
        <h1>Gestión de inventario</h1>
        <span className="usuario-label">👤 Diseñador</span>
      </header>

      <main className="inventario-main">
        {/* Sección de materiales */}
        <section className="inventario-section">
          <h2>Materiales</h2>
          <div className="grid">
            <div className="item">
              <div className="icono-material">⬜</div>
              <p>Lino blanco</p>
            </div>
            <div className="item">
              <div className="icono-material">❌</div>
              <p>Algodón rojo</p>
            </div>
            <div className="add-item">
              ➕<br />
              <span>Añadir material</span>
            </div>
          </div>
        </section>

        {/* Sección de prendas */}
        <section className="inventario-section">
          <h2>Prendas</h2>
          <div className="grid">
            <div className="item">
              <div className="icono-prenda">👘</div>
              <p>Prenda 2</p>
              <div className="acciones">
                ✏️ 🗑️
              </div>
            </div>
            <div className="item">
              <div className="icono-prenda">👘</div>
              <p>Prenda 1</p>
              <div className="acciones">
                ✏️ 🗑️
              </div>
            </div>
            <div className="add-item">
              ➕<br />
              <span>Agregar nuevo diseño</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="inventario-footer">
        <button className="guardar-btn">Guardar</button>
      </footer>
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/GestionInventario.css';

const GestionInventario: React.FC = () => {
  const navigate = useNavigate();
  // Mock de materiales y prendas para demo UX
  const [materiales, setMateriales] = useState([
    { id: 1, nombre: 'Lino blanco', icono: 'square' },
    { id: 2, nombre: 'Algodón rojo', icono: 'cross' },
  ]);
  const [prendas, setPrendas] = useState([
    { id: 1, nombre: 'Prenda 1' },
    { id: 2, nombre: 'Prenda 2' },
  ]);

  const eliminarMaterial = (id: number) => setMateriales(materiales.filter(m => m.id !== id));
  const eliminarPrenda = (id: number) => setPrendas(prendas.filter(p => p.id !== id));

  return (
    <div style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '4.5rem' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(35,35,35,0.10)', padding: '2.5rem 2.2rem', maxWidth: 980, width: '100%' }}>
        <h1 style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#232323', margin: 0, letterSpacing: '1px', textAlign: 'center', marginBottom: '2.2rem' }}>Gestión de inventario</h1>
        <main style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Sección de materiales */}
          <section style={{ flex: 1, minWidth: 320 }}>
            <h2 style={{ color: '#232323', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1.2rem', textAlign: 'center' }}>Materiales</h2>
            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {materiales.map(m => (
                <div key={m.id} style={{ background: '#f5f5f5', borderRadius: 12, padding: '1.2rem 1.1rem', minWidth: 160, minHeight: 160, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxShadow: '0 2px 8px rgba(35,35,35,0.06)' }}>
                  {/* Icono material */}
                  {m.icono === 'square' ? (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="#cccccc" stroke="#232323" strokeWidth="2.2"><rect x="6" y="6" width="24" height="24" rx="6" /></svg>
                  ) : (
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#d32f2f" strokeWidth="3"><line x1="10" y1="10" x2="26" y2="26" /><line x1="26" y1="10" x2="10" y2="26" /></svg>
                  )}
                  <p style={{ color: '#232323', fontWeight: 600, marginTop: 12 }}>{m.nombre}</p>
                  <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
                    {/* Editar (lápiz) */}
                    <span title="Editar" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#232323" strokeWidth="2"><path d="M4 15.5V18h2.5l9.1-9.1-2.5-2.5L4 15.5z"/><path d="M15.5 8.5l-2-2a1 1 0 0 1 1.4-1.4l2 2a1 1 0 0 1-1.4 1.4z"/></svg>
                    </span>
                    {/* Eliminar (bote de basura) */}
                    <span title="Eliminar" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => eliminarMaterial(m.id)}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#d32f2f" strokeWidth="2"><rect x="5" y="7" width="12" height="9" rx="2"/><line x1="8" y1="9" x2="8" y2="15"/><line x1="14" y1="9" x2="14" y2="15"/><line x1="4" y1="7" x2="18" y2="7"/></svg>
                    </span>
                  </div>
                </div>
              ))}
              {/* Card Añadir Material */}
              <div style={{ background: '#e0e0e0', borderRadius: 12, padding: '1.2rem 1.1rem', minWidth: 160, minHeight: 160, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer', border: '2px dashed #cccccc', color: '#232323', fontWeight: 600 }} onClick={() => navigate('/nuevo-material')}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#232323" strokeWidth="2.2"><line x1="18" y1="8" x2="18" y2="28" /><line x1="8" y1="18" x2="28" y2="18" /></svg>
                <span style={{ fontSize: '1rem', display: 'block', marginTop: 12 }}>Añadir material</span>
              </div>
            </div>
          </section>
          {/* Sección de prendas */}
          <section style={{ flex: 1, minWidth: 320 }}>
            <h2 style={{ color: '#232323', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1.2rem', textAlign: 'center' }}>Prendas</h2>
            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {prendas.map(p => (
                <div key={p.id} style={{ background: '#f5f5f5', borderRadius: 12, padding: '1.2rem 1.1rem', minWidth: 160, minHeight: 160, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxShadow: '0 2px 8px rgba(35,35,35,0.06)' }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="#cccccc" stroke="#232323" strokeWidth="2.2"><rect x="10" y="10" width="16" height="16" rx="4" /><line x1="18" y1="10" x2="18" y2="26" /></svg>
                  <p style={{ color: '#232323', fontWeight: 600, marginTop: 12 }}>{p.nombre}</p>
                  <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
                    {/* Editar (lápiz) */}
                    <span title="Editar" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#232323" strokeWidth="2"><path d="M4 15.5V18h2.5l9.1-9.1-2.5-2.5L4 15.5z"/><path d="M15.5 8.5l-2-2a1 1 0 0 1 1.4-1.4l2 2a1 1 0 0 1-1.4 1.4z"/></svg>
                    </span>
                    {/* Eliminar (bote de basura) */}
                    <span title="Eliminar" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => eliminarPrenda(p.id)}>
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#d32f2f" strokeWidth="2"><rect x="5" y="7" width="12" height="9" rx="2"/><line x1="8" y1="9" x2="8" y2="15"/><line x1="14" y1="9" x2="14" y2="15"/><line x1="4" y1="7" x2="18" y2="7"/></svg>
                    </span>
                  </div>
                </div>
              ))}
              {/* Card Agregar nuevo diseño */}
              <div style={{ background: '#e0e0e0', borderRadius: 12, padding: '1.2rem 1.1rem', minWidth: 160, minHeight: 160, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', cursor: 'pointer', border: '2px dashed #cccccc', color: '#232323', fontWeight: 600 }} onClick={() => navigate('/nuevo-diseno')}>
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" stroke="#232323" strokeWidth="2.2"><line x1="18" y1="8" x2="18" y2="28" /><line x1="8" y1="18" x2="28" y2="18" /></svg>
                <span style={{ fontSize: '1rem', display: 'block', marginTop: 12 }}>Agregar nuevo diseño</span>
              </div>
            </div>
          </section>
        </main>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
          <button className="edna-btn" style={{ minWidth: 180 }}>
            Guardar
          </button>
        </div>
      </div>
>>>>>>> feature/jessi
    </div>
  );
};

export default GestionInventario;
