import React, { useState } from 'react';
import './Register.css';

// Tipo para el rol del usuario
type UserRole = 'usuario' | 'diseñador';

// Interfaz para los datos del registro
interface RegisterData {
  role: UserRole;
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  // Campos adicionales para diseñador
  phone?: string;
  address?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterData>({
    role: 'usuario',
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

  // Manejador para cambio de rol
  const handleRoleChange = (role: UserRole) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
  };

  // Manejador para el registro
  const handleRegister = () => {
    // Validaciones básicas
    if (!formData.name || !formData.username || !formData.email || !formData.password) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Lógica de registro
    console.log('Datos de registro:', formData);
    alert(`Registro exitoso como ${formData.role}`);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Crear cuenta</h2>

        {/* Selector de rol */}
        <div className="role-selector">
          <label className="role-selector-label">Tipo de cuenta:</label>
          <div className="role-options">
            <button
              type="button"
              className={`role-button ${formData.role === 'usuario' ? 'active' : ''}`}
              onClick={() => handleRoleChange('usuario')}
            >
              👤 Usuario
            </button>
            <button
              type="button"
              className={`role-button ${formData.role === 'diseñador' ? 'active' : ''}`}
              onClick={() => handleRoleChange('diseñador')}
            >
              👨‍🎨 Diseñador
            </button>
          </div>
        </div>

        {/* Campos comunes */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Nombre completo *</label>
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

        {/* Campos adicionales para usuario */}
        {formData.role === 'usuario' && (
          <>
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
          </>
        )}

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
          Registrarse como {formData.role}
        </button>
      </div>
    </div>
  );
};

export default Register;