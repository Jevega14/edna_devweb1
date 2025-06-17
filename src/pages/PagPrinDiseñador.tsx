import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PagPrinDiseñador.css';

const PagPrinDiseñador: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>EdnaModa</h1>
        <div className="user-info">
          <span 
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/perfil-diseñador')}
          >
            👤 Diseñador
          </span>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="card" onClick={() => alert('Ir a nueva prenda/material')}>
          <span className="icon">🧵➕</span>
          <p>Nueva prenda/material</p>
        </div>

        <div className="card" onClick={() => alert('Ir a mis materiales y prendas')}>
          <span className="icon">🧵</span>
          <p>Mis materiales y prendas</p>
        </div>

        <div className="card" onClick={() => alert('Ir a mis pedidos')}>
          <span className="icon">🧾</span>
          <p>Mis pedidos</p>
        </div>
      </main>

      <footer className="dashboard-footer">
        <button className="logout-button" onClick={() => alert('Cerrar sesión')}>
          🔄 Cerrar sesión
        </button>
      </footer>
    </div>
  );
};

export default PagPrinDiseñador;
