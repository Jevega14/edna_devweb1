import React, { useState } from 'react';
import './FormularioDiseno.css';

const FormularioDiseno: React.FC = () => {
  const [imagen, setImagen] = useState<File | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);

  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [color, setColor] = useState<string>('#ff0000');
  const [coloresSeleccionados, setColoresSeleccionados] = useState<string[]>([]);

  const handleImagen = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImagen(file);
      setImagenPreview(URL.createObjectURL(file));
    }
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const agregarColor = () => {
    if (!coloresSeleccionados.includes(color)) {
      setColoresSeleccionados([...coloresSeleccionados, color]);
    }
  };

  return (
    <div className="formulario-diseno">
      <header className="formulario-header">
        <h1>Diseño</h1>
        <span className="usuario-label">👤 Diseñador</span>
      </header>

      <main className="formulario-main">
        {/* Columna izquierda: imagen */}
        <div className="columna-izquierda">
          <p>&lt; Nombre &gt;</p>
          <div className="imagen-preview">
            <label htmlFor="cargar-imagen" className="cargar-imagen">
              ⬆️
              <p>Cargar imagen</p>
            </label>
            <input
              id="cargar-imagen"
              type="file"
              accept="image/*"
              onChange={handleImagen}
              style={{ display: 'none' }}
            />
            {imagen && <p className="nombre-archivo">{imagen.name}</p>}
            {imagenPreview && (
              <img
                src={imagenPreview}
                alt="Vista previa"
                className="imagen-cargada"
              />
            )}
          </div>
        </div>

        {/* Columna derecha: formulario */}
        <div className="columna-derecha">
          <label>
            Nombre:
            <input type="text" />
          </label>

          <label>
            Tipo de prenda:
            <select>
              <option>Gafas</option>
              <option>Pañoleta</option>
              <option>Sombrero</option>
              <option>Tocado</option>
              <option>Camisa</option>
              <option>Camiseta</option>
              <option>Pantalon</option>
              <option>Shorts</option>
              <option>Vestido</option>
              <option>Short</option>
              <option>Falda</option>
            </select>
          </label>

          <label>
            Talla:
            <select>
              <option>xxs</option>
              <option>xs</option>
              <option>s</option>
              <option>m</option>
              <option>l</option>
              <option>xl</option>
              <option>xxl</option>
            </select>
          </label>

          <label>
            Color(es):
            <div className="color-picker-area">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <button type="button" onClick={agregarColor}>
                Añadir
              </button>
            </div>
            <div className="color-list">
              {coloresSeleccionados.map((col, i) => (
                <div
                  key={i}
                  className="color-preview-box"
                  style={{ backgroundColor: col }}
                  title={col}
                />
              ))}
            </div>
          </label>
          <label>
            Tipo de tela:
            <select>
              <option>Algodón</option>
              <option>Lino</option>
              <option>Lana</option>
              <option>Cuero real</option>
              <option>Cuero sintético</option> 
              <option>Cuerina</option>
              <option>Latex</option>
              <option>Tul</option>
              <option>Vinilo</option>
              <option>Lino</option>
              <option>Seda</option>
            </select>
          </label>
          <label className="logo-section">
            Logo:
            <label htmlFor="logo-input" className="boton-logo">
              ➕
            </label>
            <input
              id="logo-input"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleLogo}
            />
            {logo && <p className="nombre-archivo">{logo.name}</p>}
            {logoPreview && (
              <img
                src={logoPreview}
                alt="Vista previa del logo"
                className="logo-preview"
              />
            )}
          </label>

          <label>
            Costo:
            <input type="number" />
          </label>

          <div className="confirmar-container">
            <button className="boton-confirmar">Confirmar ➤</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormularioDiseno;
