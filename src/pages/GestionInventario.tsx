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
    </div>
  );
};

export default GestionInventario;
