import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const PagPrinUsuario: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#f5f5f5' }}>
      <div className="edna-user-home" style={{ margin: '2rem auto 0 auto', maxWidth: '820px', minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <main className="edna-user-main" style={{ gap: '2rem', padding: '1.5rem 1rem', display: 'flex', justifyContent: 'center' }}>
          <div className="edna-user-card" style={{ minWidth: '150px', minHeight: '150px' }} onClick={() => navigate('/diseñosguardados')}>
            <span className="edna-user-icon" style={{ fontSize: '2.5rem' }}>
              {/* Ícono de camiseta */}
              <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="#232323" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="14" y="14" width="20" height="24" rx="4" fill="#cccccc"/>
                <polyline points="14,14 8,8 16,4 24,12 32,4 40,8 34,14" fill="none"/>
              </svg>
            </span>
            <p style={{ fontSize: '0.9rem' }}>Gestionar mis diseños</p>
          </div>
          <div className="edna-user-card" style={{ minWidth: '150px', minHeight: '150px' }} onClick={() => navigate('/CarritoCompra')}>
            <span className="edna-user-icon" style={{ fontSize: '2.5rem' }}>
              {/* Ícono de carrito elegante */}
              <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="#232323" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="17" cy="40" r="3" fill="#cccccc"/>
                <circle cx="35" cy="40" r="3" fill="#cccccc"/>
                <path d="M10 12h2l4 20h16l4-12H16" fill="none"/>
                <rect x="10" y="12" width="28" height="4" rx="2" fill="#cccccc"/>
              </svg>
            </span>
            <p style={{ fontSize: '0.9rem' }}>Mi carrito de compras</p>
          </div>
          <div className="edna-user-card" style={{ minWidth: '150px', minHeight: '150px' }} onClick={() => navigate('/pedidos-usuario')}>
            <span className="edna-user-icon" style={{ fontSize: '2.5rem' }}>
              {/* Ícono de recibo/lista */}
              <svg width="36" height="36" viewBox="0 0 48 48" fill="none" stroke="#232323" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="12" y="8" width="24" height="32" rx="4" fill="#cccccc"/>
                <line x1="16" y1="16" x2="32" y2="16" />
                <line x1="16" y1="24" x2="32" y2="24" />
                <line x1="16" y1="32" x2="32" y2="32" />
              </svg>
            </span>
            <p style={{ fontSize: '0.9rem' }}>Mis pedidos</p>
          </div>
        </main>
      </div>
      <div style={{ position: 'fixed', left: '1rem', bottom: '2.5rem', zIndex: 10 }}>
        <button className="edna-btn edna-back-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => navigate('/login')}>
          {/* Ícono de flecha hacia la izquierda */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#232323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
            <path d="M19 12H9"></path>
          </svg>
        </button>
      </div>
      <div style={{ position: 'fixed', right: '3.5rem', bottom: '2.5rem', zIndex: 10, display: 'flex', gap: '1rem' }}>
        <button className="edna-btn edna-user-profile-btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }} onClick={() => navigate('/perfil')}>
          Mi perfil
        </button>
        <button className="edna-btn edna-logout-btn" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }} onClick={() => navigate('/login')}>
          Cerrar sesión
        </button>
      </div>
      <div style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 10 }}>
        <button className="edna-btn edna-home-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }} onClick={() => navigate('/home')}>
        </button>
      </div>
    </div>
  );
};

export default PagPrinUsuario;

