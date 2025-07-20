import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/InicioSesion.css';

const InicioSesion: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<'usuario' | 'admin'>('usuario'); // Estado para el rol
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    // Determinamos el endpoint y la clave para el ID basado en el rol seleccionado
    const endpoint = role === 'usuario'
        ? 'http://localhost:4000/api/auth/login'
        : 'http://localhost:4000/api/admins/login';

    const idKey = role === 'usuario' ? 'userId' : 'adminId';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión.');
      }

      // Guardamos el token y el ID correspondiente
      localStorage.setItem('authToken', data.token);
      localStorage.setItem(idKey, data[idKey]);

      // Limpiamos el ID del otro rol para evitar confusiones
      localStorage.removeItem(role === 'usuario' ? 'adminId' : 'userId');

      // Redirigimos a la página correcta según el rol
      if (role === 'usuario') {
        navigate('/usuario');
      } else {
        navigate('/diseñador');
      }

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Inicio de sesión</h2>

          {/* --- SELECTOR DE ROL AÑADIDO --- */}
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Iniciar sesión como:</label>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <label>
                <input
                    type="radio"
                    name="role"
                    value="usuario"
                    checked={role === 'usuario'}
                    onChange={() => setRole('usuario')}
                /> Usuario
              </label>
              <label>
                <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                /> Diseñador
              </label>
            </div>
          </div>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <div className="form-group">
            <label htmlFor="email" className="form-label">Correo</label>
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
            <label htmlFor="password" className="form-label">Contraseña</label>
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
