import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const PagPrinDiseñador: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', padding: '2.5rem 4vw 0 4vw' }}>
        <button className="edna-btn edna-user-profile-btn" style={{ marginTop: '-1.2rem' }} onClick={() => navigate('/perfil-diseñador')}>
          Mi perfil
        </button>
      </div>
      <div className="edna-user-home" style={{ margin: '3.5rem auto 0 auto', maxWidth: '520px', minHeight: '240px' }}>
        <main className="edna-user-main" style={{ gap: '2.5rem', padding: '2.5rem 1.5rem', justifyContent: 'center', display: 'flex' }}>
          <div className="edna-user-card" style={{ minWidth: '200px', minHeight: '200px' }} onClick={() => navigate('/inventario')}>
            <span className="edna-user-icon" style={{ fontSize: '3rem' }}>
              {/* Inventario SVG */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#232323" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="8" y="12" width="32" height="24" rx="6" fill="#cccccc" />
                <line x1="16" y1="20" x2="32" y2="20" />
                <line x1="16" y1="28" x2="32" y2="28" />
              </svg>
            </span>
            <p>Gestionar mi inventario</p>
          </div>
          <div className="edna-user-card" style={{ minWidth: '200px', minHeight: '200px' }} onClick={() => navigate('/pedidos-disenador')}>
            <span className="edna-user-icon" style={{ fontSize: '3rem' }}>
              {/* Caja SVG */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#232323" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="10" y="16" width="28" height="20" rx="4" fill="#cccccc" />
                <polyline points="10,16 24,8 38,16" fill="none" />
                <line x1="24" y1="8" x2="24" y2="36" />
              </svg>
            </span>
            <p>Mis pedidos</p>
          </div>
        </main>
      </div>
      <div style={{ position: 'fixed', right: '3.5rem', bottom: '2.5rem', zIndex: 10 }}>
        <button className="edna-btn edna-logout-btn" onClick={() => navigate('/login')}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default PagPrinDiseñador;
