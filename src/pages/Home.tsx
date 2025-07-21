import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import MascaraIcono from "../icons/MascaraIcono.svg";
import BotaIcono from "../icons/BotaIcono.svg";
import CapaIcono from "../icons/CapaIcono.svg";
import CinturonIcono from "../icons/CinturonIcono.svg";
import EscudoIcono from "../icons/EscudoIcono.svg";
import GuantesIcono from "../icons/GuantesIcono.svg";
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
        <img src={MascaraIcono} width={36} height={36} alt="Escudo" />
      </span>
            <span className="edna-category-label">Máscara</span>
          </div>
          <div className="edna-category-item">
            {/* Capa (wind icon) */}
      <span className="edna-category-icon">
        <img src={CapaIcono} width={36} height={36} alt="Escudo" />
      </span>
            <span className="edna-category-label">Capa</span>
          </div>
    <div className="edna-category-item">
      <span className="edna-category-icon">
        <img src={EscudoIcono} width={36} height={36} alt="Escudo" />
      </span>
      <span className="edna-category-label">Escudo</span>
    </div>
          <div className="edna-category-item">
            {/* Botas (activity icon) */}
                 <span className="edna-category-icon">
        <img src={BotaIcono} width={36} height={36} alt="Escudo" />
      </span>
            <span className="edna-category-label">Botas</span>
          </div>
          <div className="edna-category-item">
            {/* Guantes (hand icon) */}
                 <span className="edna-category-icon">
        <img src={GuantesIcono} width={36} height={36} alt="Escudo" />
      </span>
            <span className="edna-category-label">Guantes</span>
          </div>
          <div className="edna-category-item">
            {/* Cinturón (circle icon) */}
              <span className="edna-category-icon">
        <img src={CinturonIcono} width={36} height={36} alt="Escudo" />
      </span>
            <span className="edna-category-label">Cinturón</span>
          </div>
        </div>
      </div>
      {/* Botón para ir a Diseñador */}
      {/*<div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2.2rem' }}>
        <button className="edna-btn" style={{ fontSize: '0.98rem', padding: '0.5rem 1.2rem', minWidth: 0, width: 'auto', borderRadius: 8 }} onClick={() => navigate('/Diseñador')}>
          Ir a Diseñador
        </button>
      </div>*/}
    </div>
  );
};

export default Home;