import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/InicioSesion.css';

// Componente principal de la aplicación
const InicioSesion: React.FC = () => {
  // Estados para almacenar los valores de los campos de correo y contraseña
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  // Manejador del cambio para el campo de correo
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Manejador del cambio para el campo de contraseña
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Manejador para el botón "Ingresar"
  const handleLogin = () => {
    // Aquí podrías validar credenciales
    navigate('/usuario');
  };

  return (
    // Usa la clase 'login-container' para el div principal
    <div className="login-container">
      {/* Botón para navegar a la página de inicio */}
      <div style={{ position: 'fixed', top: '1rem', left: '1rem', zIndex: 10 }}>
        <button
          className="edna-btn edna-home-btn"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem',
          }}
          onClick={() => navigate('/home')}
        >
          {/* Ícono de flecha hacia la izquierda */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#232323"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
            <path d="M19 12H9"></path>
          </svg>
        </button>
      </div>

      {/* Usa la clase 'login-card' para el contenedor del formulario */}
      <div className="login-card">
        {/* Usa la clase 'login-title' para el título */}
        <h2 className="login-title">Inicio de sesión</h2>

        {/* Grupo de formulario para el correo */}
        <div className="form-group">
          {/* Etiqueta para el campo de correo */}
          <label htmlFor="email" className="form-label">
            Correo
          </label>
          {/* Campo de entrada de correo */}
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="tu_correo@ejemplo.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        {/* Grupo de formulario para la contraseña */}
        <div className="form-group-last">
          {/* Etiqueta para el campo de contraseña */}
          <label htmlFor="password" className="form-label">
            Contraseña
          </label>
          {/* Campo de entrada de contraseña */}
          <input
            type="password"
            id="password"
            className="form-input"
            placeholder="••••••••"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        {/* Grupo de botones */}
        <div className="button-group">
          {/* Botón de ingresar */}
          <button className="button-base login-button" onClick={handleLogin}>
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
