import React from 'react';
import './PagPrinUsuario.css';

const PagPrinUsuario: React.FC = () => {
  return (
    <div className="usuario-container">
      <header className="usuario-header">
        <h1>EdnaModa</h1>
        <div className="user-info">
          <span>👤 Usuario</span>
        </div>
      </header>

      <main className="usuario-main">
        <div className="card" onClick={() => alert('Gestionar mis diseños')}>
          <span className="icon">👘</span>
          <p>Gestionar mis diseños</p>
        </div>

        <div className="card" onClick={() => alert('Mi carrito de compras')}>
          <span className="icon">🛒</span>
          <p>Mi carrito de compras</p>
        </div>

        <div className="card" onClick={() => alert('Mis pedidos')}>
          <span className="icon">🧾</span>
          <p>Mis pedidos</p>
        </div>
      </main>

      <footer className="usuario-footer">
        <button className="logout-button" onClick={() => alert('Cerrar sesión')}>
          🔄 Cerrar sesión
        </button>
      </footer>
    </div>
  );
};

export default PagPrinUsuario;
