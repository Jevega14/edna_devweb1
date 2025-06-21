import React, { useState } from 'react';
import '../styles.css';
import './styles/EditarPerfil.css';

// Define el tipo para los datos del perfil
interface UserProfile {
  name: string;
  username: string;
  address: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const EditarPerfil: React.FC = () => {
  // Estado para almacenar los datos del perfil del usuario
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    username: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  // Manejador genérico para actualizar cualquier campo del perfil
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  // Manejador para el botón "Guardar"
  const handleSave = () => {
    if (profile.password && profile.password !== profile.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Lógica para guardar las modificaciones del perfil
    console.log('Perfil guardado:', profile);
    // Aquí es donde enviarías los datos actualizados a tu backend
    alert('Perfil actualizado correctamente.');
  };

  return (
    <div className="edna-home" style={{ maxWidth: 540, margin: '3rem auto', padding: '2.5rem 2rem', textAlign: 'left' }}>
      <div className="profile-title-group" style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '2.2rem', gap: '0.7rem' }}>
        <h2 className="profile-title" style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontWeight: 800, fontSize: '2.1rem', color: '#232323', margin: 0, letterSpacing: '1px', textAlign: 'center', width: '100%' }}>
          Editar mi perfil
        </h2>
      </div>
      <div className="form-group">
        <label htmlFor="name" className="form-label">Nombre</label>
        <input
          type="text"
          id="name"
          className="form-input"
          value={profile.name}
          onChange={handleChange}
          placeholder="Tu nombre completo"
        />
      </div>
      <div className="form-group">
        <label htmlFor="username" className="form-label">Nombre de usuario</label>
        <input
          type="text"
          id="username"
          className="form-input"
          value={profile.username}
          onChange={handleChange}
          placeholder="nombre.usuario"
        />
      </div>
      <div className="form-group">
        <label htmlFor="address" className="form-label">Dirección</label>
        <input
          type="text"
          id="address"
          className="form-input"
          value={profile.address}
          onChange={handleChange}
          placeholder="Tu dirección"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone" className="form-label">Teléfono</label>
        <input
          type="tel"
          id="phone"
          className="form-input"
          value={profile.phone}
          onChange={handleChange}
          placeholder="123-456-7890"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">Nueva contraseña</label>
        <input
          type="password"
          id="password"
          className="form-input"
          value={profile.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
      </div>
      <div className="form-group-last">
        <label htmlFor="confirmPassword" className="form-label">Confirmar contraseña</label>
        <input
          type="password"
          id="confirmPassword"
          className="form-input"
          value={profile.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
        />
      </div>
      <button
        onClick={handleSave}
        className="edna-btn"
        style={{ width: '100%', marginTop: '1.5rem' }}
      >
        Guardar modificaciones
      </button>
    </div>
  );
};

export default EditarPerfil;
