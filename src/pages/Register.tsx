import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

// Interfaz para los datos del registro
interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  address?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  });

  // Manejador para cambios en campos de texto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Validación de contraseña: mínimo 6 caracteres, al menos una letra y un número
  const isPasswordValid = (password: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
  };

  // Manejador para el registro
  const handleRegister = () => {
    if (!formData.name || !formData.username || !formData.email || !formData.password) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    if (!isPasswordValid(formData.password)) {
      alert('La contraseña debe tener al menos 6 caracteres, incluir letras y números.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Lógica de registro
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Registro</h2>
        {/* Campos comunes */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nombre *</label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={formData.name}
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
          <label htmlFor="phone" className="form-label">Teléfono</label>
          <input
            type="tel"
            id="phone"
            className="form-input"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="123-456-7890"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" className="form-label">Dirección</label>
          <input
            type="text"
            id="address"
            className="form-input"
            value={formData.address}
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
          <small style={{color:'#888',fontSize:'0.92rem'}}>Mínimo 6 caracteres, debe incluir letras y números.</small>
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
        >
          Crear cuenta
        </button>
      </div>
    </div>
  );
};

export default Register;