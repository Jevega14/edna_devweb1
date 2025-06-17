import React, { useState } from "react";
import "./EditarPerfilDiseñador.css";

// Define el tipo para los datos del perfil del diseñador
interface DesignerProfile {
  name: string;
  username: string;
  email: string;
  password: string;
}

const EditarPerfilDiseñador: React.FC = () => {
  // Estado para almacenar los datos del perfil del diseñador (ejemplo)
  const [profile, setProfile] = useState<DesignerProfile>({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  // Manejador genérico para actualizar cualquier campo del perfil
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  // Manejador para el botón "Guardar"
  const handleSave = () => {
    // Lógica para guardar las modificaciones del perfil
    console.log("Perfil de diseñador guardado:", profile);
    // Aquí es donde enviarías los datos actualizados a tu backend
    // En un entorno real, podrías mostrar un mensaje de éxito o error
    console.log("Funcionalidad de guardar pendiente.");
  };

  return (
    <div className="designer-profile-container">
      <div className="designer-profile-card">
        <div className="designer-profile-title-group">
          <h2 className="designer-profile-title">
            Editar mi perfil - Diseñador
          </h2>
          {/* Icono de diseñador */}
          <span
            role="img"
            aria-label="designer icon"
            className="designer-profile-icon"
          >
            👨‍🎨
          </span>
        </div>

        {/* Campo para el nombre */}
        <div className="designer-form-field">
          <label htmlFor="name" className="designer-field-label">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className="designer-field-input"
            value={profile.name}
            onChange={handleChange}
          />
        </div>

        {/* Campo para el nombre de usuario */}
        <div className="designer-form-field">
          <label htmlFor="username" className="designer-field-label">
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            className="designer-field-input"
            value={profile.username}
            onChange={handleChange}
          />
        </div>

        {/* Campo para el correo */}
        <div className="designer-form-field">
          <label htmlFor="email" className="designer-field-label">
            Correo
          </label>
          <input
            type="email"
            id="email"
            className="designer-field-input"
            value={profile.email}
            onChange={handleChange}
          />
        </div>

        {/* Campo para la contraseña */}
        <div className="designer-form-field">
          <label htmlFor="password" className="designer-field-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="designer-field-input"
            placeholder="Nueva contraseña"
            value={profile.password}
            onChange={handleChange}
          />
        </div>

        {/* Botón de guardar */}
        <button onClick={handleSave} className="designer-save-button">
          Guardar modificaciones
        </button>
      </div>
    </div>
  );
};

export default EditarPerfilDiseñador;
