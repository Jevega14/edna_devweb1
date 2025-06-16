import React, { useState } from 'react';
import './InicioSesion.css';

// Componente principal de la aplicación
const InicioSesion: React.FC = () => {
  // Estados para almacenar los valores de los campos de correo y contraseña
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // Manejador del cambio para el campo de correo
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Manejador del cambio para el campo de contraseña
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Manejador para el botón "Registrarse"
  const handleRegister = () => {
    // Lógica para registrarse (puedes añadir tu implementación aquí)
    console.log('Registrarse con:', { email, password });
    // En un entorno de producción, aquí podrías mostrar un modal de confirmación
    // o un mensaje en la UI en lugar de un alert.
    console.log('Funcionalidad de registro pendiente.');
  };

  // Manejador para el botón "Ingresar"
  const handleLogin = () => {
    // Lógica para iniciar sesión (puedes añadir tu implementación aquí)
    console.log('Ingresar con:', { email, password });
    // En un entorno de producción, aquí podrías mostrar un modal de confirmación
    // o un mensaje en la UI en lugar de un alert.
    console.log('Funcionalidad de inicio de sesión pendiente.');
  };

  return (
    // Usa la clase 'login-container' para el div principal
    <div className="login-container">
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
          {/* Botón de registrarse */}
          <button
            onClick={handleRegister}
            className="button-base register-button"
          >
            Registrarse
          </button>
          {/* Botón de ingresar */}
          <button
            onClick={handleLogin}
            className="button-base login-button"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
