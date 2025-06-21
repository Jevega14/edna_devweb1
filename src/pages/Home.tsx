import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleRegistrarse = () => {
    navigate("/register");
  };

  const handleIniciarSesion = () => {
    navigate("/login");
  };

  return (
    <div className="edna-home">
      <h2>¡Bienvenido a EdnaModa!</h2>
      <p>Donde tus diseños soñados se hacen realidad</p>
      <div className="edna-home-actions">
        <div>
          <span>¿Primera vez?</span>
          <button className="edna-btn" onClick={handleRegistrarse}>
            Regístrate
          </button>
        </div>
        <div>
          <span>¿Ya estás registrado?</span>
          <button className="edna-btn" onClick={handleIniciarSesion}>
            Inicia sesión
          </button>
        </div>
      </div>
      <div className="edna-home-categories">
        <div className="edna-category-grid">
          <div className="edna-category-item">
            {/* Máscara (eye icon) */}
            <span className="edna-category-icon">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#232323"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <ellipse cx="12" cy="12" rx="10" ry="6" />
                <circle cx="12" cy="12" r="2.5" fill="#cccccc" stroke="#232323" />
              </svg>
            </span>
            <span className="edna-category-label">Máscara</span>
          </div>
          <div className="edna-category-item">
            {/* Capa (wind icon) */}
            <span className="edna-category-icon">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#232323"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12s4-8 9-8 9 8 9 8-4 8-9 8-9-8-9-8z" fill="#cccccc" />
              </svg>
            </span>
            <span className="edna-category-label">Capa</span>
          </div>
          <div className="edna-category-item">
            {/* Escudo (shield icon) */}
            <span className="edna-category-icon">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#232323"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2l7 4v6c0 5.25-3.5 10-7 10S5 17.25 5 12V6l7-4z" fill="#cccccc" />
              </svg>
            </span>
            <span className="edna-category-label">Escudo</span>
          </div>
          <div className="edna-category-item">
            {/* Botas (activity icon) */}
            <span className="edna-category-icon">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#232323"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                <rect x="7" y="18" width="4" height="3" fill="#cccccc" stroke="#232323" />
              </svg>
            </span>
            <span className="edna-category-label">Botas</span>
          </div>
          <div className="edna-category-item">
            {/* Guantes (hand icon) */}
            <span className="edna-category-icon">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#232323"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 13V7a2 2 0 1 1 4 0v6" />
                <path d="M12 13V5a2 2 0 1 1 4 0v8" />
                <rect x="6" y="13" width="12" height="7" rx="2" fill="#cccccc" stroke="#232323" />
              </svg>
            </span>
            <span className="edna-category-label">Guantes</span>
          </div>
          <div className="edna-category-item">
            {/* Cinturón (circle icon) */}
            <span className="edna-category-icon">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#232323"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="8" fill="#cccccc" />
                <circle cx="12" cy="12" r="3" fill="#232323" />
              </svg>
            </span>
            <span className="edna-category-label">Cinturón</span>
          </div>
        </div>
      </div>
      {/* Botón para ir a Diseñador */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2.2rem' }}>
        <button className="edna-btn" style={{ fontSize: '0.98rem', padding: '0.5rem 1.2rem', minWidth: 0, width: 'auto', borderRadius: 8 }} onClick={() => navigate('/Diseñador')}>
          Ir a Diseñador
        </button>
      </div>
    </div>
  );
};

export default Home;