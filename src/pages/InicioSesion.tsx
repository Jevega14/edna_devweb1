import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/InicioSesion.css';

const InicioSesion: React.FC = () => {
  // Estados para el formulario y mensajes de error
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null); // Para mostrar errores al usuario
  const navigate = useNavigate();

  // --- FUNCIÓN DE LOGIN ACTUALIZADA ---
  const handleLogin = async () => {
    setError(null); // Limpiamos errores previos

    // Validación básica en el frontend
    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    try {
      // 1. Hacemos la petición POST a nuestro backend
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      // 2. Verificamos si la respuesta del backend fue exitosa
      if (!response.ok) {
        // Si hay un mensaje de error en la respuesta del backend, lo mostramos
        throw new Error(data.message || 'Error al iniciar sesión.');
      }

      // 3. Si el login es exitoso, guardamos el token
      // localStorage es un pequeño almacén en el navegador.
      // Guardamos el token para poder usarlo después en otras peticiones.
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userId', data.userId);

      // 4. Redirigimos al usuario a su página principal
      navigate('/usuario');

    } catch (err: any) {
      // Si algo falla (la red, el servidor, etc.), mostramos el error
      setError(err.message);
    }
  };

  return (
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Inicio de sesión</h2>

          {/* Mostramos el mensaje de error si existe */}
          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Correo
            </label>
            <input
                type="email"
                id="email"
                className="form-input"
                placeholder="tu_correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group-last">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
                type="password"
                id="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="button-group" style={{ display: 'flex', justifyContent: 'center' }}>
            <button
                className="button-base login-button"
                onClick={handleLogin}
                style={{ width: '60%' }}
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
  );
};

export default InicioSesion;