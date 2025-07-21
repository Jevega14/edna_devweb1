import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Register.css';

// Interfaz para los datos del registro (la mantenemos igual)
interface RegisterData {
  nombre: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  telefono?: string;
  direccion?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterData>({
    nombre: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    direccion: ''
  });

  // Estados para manejar la carga y los errores
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const isPasswordValid = (password: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
  };

  // --- FUNCIÓN DE REGISTRO ACTUALIZADA ---
  const handleRegister = async () => {
    setError(null);
    setIsLoading(true);

    // Validaciones del frontend
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setIsLoading(false);
      return;
    }
    if (!isPasswordValid(formData.password)) {
      setError('La contraseña debe tener al menos 6 caracteres, con letras y números.');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Preparamos los datos para enviar (excluimos confirmPassword)
      const { confirmPassword, ...dataToSend } = formData;

      // 2. Hacemos la petición POST al backend
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      // 3. Verificamos si la respuesta del backend fue exitosa
      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar la cuenta.');
      }

      // 4. Si el registro es exitoso, informamos al usuario y lo redirigimos
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      navigate('/login');

    } catch (err: any) {
      // Si algo falla, mostramos el error
      setError(err.message);
    } finally {
      // Pase lo que pase, dejamos de cargar
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      {/* Volver arriba */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          margin: '1rem 0 1.5rem 0'
        }}
      >
        <button
          className="edna-btn"
          style={{
            fontSize: '1rem',
            padding: '0.5rem 1.5rem',
            borderRadius: 8,
            background: '#fff',
            color: '#232323',
            border: '2px solid #cccccc',
            boxShadow: 'none'
          }}
          onClick={() => navigate('/home')}
        >
          ↩ Volver
        </button>
      </div>

      <div className="register-card">
        <h2 className="register-title">Registro</h2>
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">Nombre *</label>
          <input
            type="text"
            id="nombre"
            className="form-input"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Tu nombre completo"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="form-label">Nombre de usuario *</label>
          <input
            type="text"
            id="username"
            className="form-input"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="nombre.usuario"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Correo electrónico *</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="tu@correo.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            className="form-input"
            value={formData.telefono}
            onChange={handleInputChange}
            placeholder="123-456-7890"
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input
            type="text"
            id="direccion"
            className="form-input"
            value={formData.direccion}
            onChange={handleInputChange}
            placeholder="Tu dirección"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Contraseña *</label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••••"
          />
          <small style={{ color: '#888', fontSize: '0.92rem' }}>
            Mínimo 6 caracteres, debe incluir letras y números.
          </small>
        </div>
        <div className="form-group-last">
          <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña *</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-input"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="••••••••"
          />
        </div>
        <button
          onClick={handleRegister}
          className="register-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>
      </div>
    </div>
  );
};

export default Register;
