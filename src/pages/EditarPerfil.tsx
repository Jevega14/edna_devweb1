import React, { useState } from 'react';
import './EditarPerfil.css';

// Define el tipo para los datos del perfil
interface UserProfile {
  name: string;
  username: string;
  address: string;
  phone: string;
}

const EditarPerfil: React.FC = () => {
  // Estado para almacenar los datos del perfil del usuario
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Nombre de Usuario',
    username: 'nombre.usuario',
    address: 'Dirección del Usuario',
    phone: '123-456-7890',
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
    // Lógica para guardar las modificaciones del perfil
    console.log('Perfil guardado:', profile);
    // Aquí es donde enviarías los datos actualizados a tu backend
    // En un entorno real, podrías mostrar un mensaje de éxito o error
    console.log('Funcionalidad de guardar pendiente.');
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-title-group">
          <h2 className="profile-title">Editar mi perfil - Usuario</h2>
          {/* Icono de usuario simple (puedes reemplazarlo con un SVG de Lucide React si lo usas) */}
          <span role="img" aria-label="user icon" className="profile-icon">👤</span>
        </div>

        {/* Campo para el nombre */}
        <div className="form-field">
          <label htmlFor="name" className="field-label">Nombre</label>
          <input
            type="text"
            id="name"
            className="field-input"
            value={profile.name}
            onChange={handleChange}
          />
        </div>

        {/* Campo para el nombre de usuario */}
        <div className="form-field">
          <label htmlFor="username" className="field-label">Nombre de usuario</label>
          <input
            type="text"
            id="username"
            className="field-input"
            value={profile.username}
            onChange={handleChange}
          />
        </div>

        {/* Campo para la dirección */}
        <div className="form-field">
          <label htmlFor="address" className="field-label">Dirección</label>
          <input
            type="text"
            id="address"
            className="field-input"
            value={profile.address}
            onChange={handleChange}
          />
        </div>

        {/* Campo para el teléfono (este es el último, por eso la clase form-field) */}
        <div className="form-field">
          <label htmlFor="phone" className="field-label">Teléfono</label>
          <input
            type="tel" // Tipo 'tel' para números de teléfono
            id="phone"
            className="field-input"
            value={profile.phone}
            onChange={handleChange}
          />
        </div>

        {/* Botón de guardar */}
        <button
          onClick={handleSave}
          className="save-button"
        >
          Guardar modificaciones
        </button>
      </div>
    </div>
  );
};

export default EditarPerfil;
