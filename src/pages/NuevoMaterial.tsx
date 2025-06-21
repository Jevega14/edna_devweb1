import React, { useState } from 'react';
<<<<<<< HEAD
import './NuevoMaterial.css';
=======
import './styles/NuevoMaterial.css';
>>>>>>> feature/jessi

const NuevoMaterial: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);

  const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const handleGuardar = () => {
    alert(`Material "${nombre}" guardado (solo visual).`);
  };

  return (
<<<<<<< HEAD
    <div className="nuevo-material-container">
      <h2>Añadir nuevo material</h2>

      <label>
        Nombre del material:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </label>

      <label className="imagen-section">
        Imagen del material:
        <input type="file" accept="image/*" onChange={handleImagen} />
        {imagenPreview && (
          <img src={imagenPreview} alt="Vista previa" className="imagen-preview" />
        )}
      </label>

      <button onClick={handleGuardar}>Guardar</button>
=======
    <div style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '4.5rem' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(35,35,35,0.10)', padding: '2.5rem 2.2rem', maxWidth: 440, width: '100%' }}>
        <h2 style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#232323', margin: 0, letterSpacing: '1px', textAlign: 'center', marginBottom: '2rem' }}>Añadir nuevo material</h2>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#232323', fontWeight: 600, display: 'block', marginBottom: 6 }} htmlFor="nombre-material">Nombre del material</label>
          <input
            id="nombre-material"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', padding: '0.6rem', borderRadius: 8, border: '1.5px solid #cccccc', fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontSize: '1rem' }}
          />
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#232323', fontWeight: 600, display: 'block', marginBottom: 6 }}>Imagen del material</label>
          <input type="file" accept="image/*" onChange={handleImagen} style={{ marginBottom: 10 }} />
          {imagenPreview && (
            <img src={imagenPreview} alt="Vista previa" style={{ marginTop: 12, maxWidth: '100%', maxHeight: 200, border: '1.5px solid #cccccc', borderRadius: 10 }} />
          )}
        </div>
        <button className="edna-btn" style={{ width: '100%', marginTop: '0.5rem' }} onClick={handleGuardar}>Guardar</button>
      </div>
>>>>>>> feature/jessi
    </div>
  );
};

export default NuevoMaterial;
