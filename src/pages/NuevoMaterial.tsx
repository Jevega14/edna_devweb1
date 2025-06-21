import React, { useState } from 'react';
import './NuevoMaterial.css';

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
    </div>
  );
};

export default NuevoMaterial;
