import React, { useState } from "react";
import './styles/EditarPerfilDiseñador.css';

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
    <div
      className="designer-profile-container"
      style={{
        fontFamily: "Montserrat, Segoe UI, Arial, sans-serif",
        background: "#f5f5f5",
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '4.5rem'
      }}
    >
      <div
        className="designer-profile-card"
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px rgba(35,35,35,0.10)",
          padding: "3.2rem 2.8rem 2.8rem 2.8rem",
          maxWidth: 540,
          width: '100%',
          margin: 0
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontFamily: "Montserrat, Segoe UI, Arial, sans-serif",
              fontWeight: 800,
              fontSize: "2.1rem",
              color: "#232323",
              margin: 0,
              letterSpacing: "1px",
            }}
          >
            Editar mi perfil 
          </h2>
        </div>
        {/* Campo para el nombre */}
        <div className="designer-form-field" style={{ marginBottom: '1rem', paddingBottom: '0.5rem' }}>
          <label
            htmlFor="name"
            className="designer-field-label"
            style={{
              color: "#232323",
              fontWeight: 600,
            }}
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            className="designer-field-input"
            style={{
              fontFamily: "Montserrat, Segoe UI, Arial, sans-serif",
            }}
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        {/* Campo para el nombre de usuario */}
        <div className="designer-form-field" style={{ marginBottom: '1rem', paddingBottom: '0.5rem' }}>
          <label
            htmlFor="username"
            className="designer-field-label"
            style={{
              color: "#232323",
              fontWeight: 600,
            }}
          >
            Nombre de usuario
          </label>
          <input
            type="text"
            id="username"
            className="designer-field-input"
            style={{
              fontFamily: "Montserrat, Segoe UI, Arial, sans-serif",
            }}
            value={profile.username}
            onChange={handleChange}
          />
        </div>
        {/* Campo para el correo */}
        <div className="designer-form-field" style={{ marginBottom: '1rem', paddingBottom: '0.5rem' }}>
          <label
            htmlFor="email"
            className="designer-field-label"
            style={{
              color: "#232323",
              fontWeight: 600,
            }}
          >
            Correo
          </label>
          <input
            type="email"
            id="email"
            className="designer-field-input"
            style={{
              fontFamily: "Montserrat, Segoe UI, Arial, sans-serif",
            }}
            value={profile.email}
            onChange={handleChange}
          />
        </div>
        {/* Campo para la contraseña */}
        <div className="designer-form-field" style={{ marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: 'none' }}>
          <label
            htmlFor="password"
            className="designer-field-label"
            style={{
              color: "#232323",
              fontWeight: 600,
            }}
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="designer-field-input"
            style={{
              fontFamily: "Montserrat, Segoe UI, Arial, sans-serif",
            }}
            placeholder="Nueva contraseña"
            value={profile.password}
            onChange={handleChange}
          />
        </div>
        {/* Botón de guardar */}
        <button
          onClick={handleSave}
          className="edna-btn"
          style={{
            width: "100%",
            marginTop: "0.5rem",
          }}
        >
          Guardar modificaciones
        </button>
      </div>
    </div>
  );
};

export default EditarPerfilDiseñador;
