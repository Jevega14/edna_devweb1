import React, { useState } from 'react';
<<<<<<< HEAD
import './FormularioDiseno.css';
=======
import './styles/FormularioDiseno.css';
>>>>>>> feature/jessi

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
<<<<<<< HEAD
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
=======
    <div style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '4.5rem' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(35,35,35,0.10)', padding: '3.5rem 3.2rem', maxWidth: 1100, width: '100%' }}>
        <h1 style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: '#232323', margin: 0, letterSpacing: '1px', textAlign: 'center', marginBottom: '2.5rem' }}>Diseño</h1>
        <main style={{ display: 'flex', gap: '3.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {/* Columna izquierda: imagen */}
          <div style={{ flex: 1, maxWidth: 480, minWidth: 320, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
            <div style={{ border: '1.5px dashed #aaa', padding: '1.5rem 1.5rem 1.2rem 1.5rem', borderRadius: 16, background: '#f5f5f5', width: '100%', maxWidth: 380, minWidth: 240, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 260, justifyContent: 'flex-start', marginBottom: 18 }}>
              <label htmlFor="cargar-imagen" style={{ display: 'block', cursor: 'pointer', color: '#232323', fontWeight: 600, fontSize: 22, marginBottom: 10 }}>
                {/* SVG icono de imagen */}
                <span style={{ display: 'block', marginBottom: 4 }}>
                  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="30" height="30" rx="6" fill="#cccccc" stroke="#232323" strokeWidth="2"/>
                    <circle cx="13.5" cy="13.5" r="3.5" fill="#fff" stroke="#232323" strokeWidth="1.5"/>
                    <path d="M8 28L16.5 19.5C17.3284 18.6716 18.6716 18.6716 19.5 19.5L30 30" stroke="#232323" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </span>
                <span style={{ fontSize: 16 }}>Cargar imagen</span>
              </label>
              <input
                id="cargar-imagen"
                type="file"
                accept="image/*"
                onChange={handleImagen}
                style={{ display: 'none' }}
              />
              {imagen && <p style={{ marginTop: 10, fontSize: 14, color: '#444' }}>{imagen.name}</p>}
              {imagenPreview && (
                <img
                  src={imagenPreview}
                  alt="Vista previa"
                  style={{ marginTop: 16, maxWidth: '100%', maxHeight: 220, border: '1.5px solid #cccccc', borderRadius: 12 }}
                />
              )}
            </div>
            <p style={{ color: '#232323', fontWeight: 600, marginBottom: 0, fontFamily: 'Montserrat', fontSize: '1.15rem' }}>&lt; Nombre &gt;</p>
          </div>
          {/* Columna derecha: formulario */}
          <div style={{ flex: 2, minWidth: 340, display: 'flex', flexDirection: 'column', gap: '2.2rem', justifyContent: 'center' }}>
            <label style={{ color: '#232323', fontWeight: 600, fontSize: '1.08rem', marginBottom: 2 }}>Nombre:
              <input type="text" style={{ padding: '0.7rem', borderRadius: 8, border: '1.5px solid #cccccc', fontFamily: 'Montserrat', fontSize: '1.08rem', marginTop: 8, width: '100%' }} />
            </label>
            <label style={{ color: '#232323', fontWeight: 600, fontSize: '1.08rem', marginBottom: 2 }}>Tipo de prenda:
              <select style={{ padding: '0.7rem', borderRadius: 8, border: '1.5px solid #cccccc', fontFamily: 'Montserrat', fontSize: '1.08rem', marginTop: 8, width: '100%' }}>
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
            <label style={{ color: '#232323', fontWeight: 600, fontSize: '1.08rem', marginBottom: 2 }}>Talla:
              <select style={{ padding: '0.7rem', borderRadius: 8, border: '1.5px solid #cccccc', fontFamily: 'Montserrat', fontSize: '1.08rem', marginTop: 8, width: '100%' }}>
                <option>xxs</option>
                <option>xs</option>
                <option>s</option>
                <option>m</option>
                <option>l</option>
                <option>xl</option>
                <option>xxl</option>
              </select>
            </label>
            <label style={{ color: '#232323', fontWeight: 600, fontSize: '1.08rem', marginBottom: 2 }}>Color(es):
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: 10, width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{ width: 38, height: 38, border: 'none', background: 'none' }}
                  />
                  <button type="button" className="edna-btn" style={{ padding: '0.5rem 1.4rem', fontSize: '1.08rem', minWidth: 90 }} onClick={agregarColor}>
                    Añadir
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0.7rem', minHeight: 40, alignItems: 'center', marginLeft: 'auto' }}>
                  {coloresSeleccionados.map((col, i) => (
                    <div
                      key={i}
                      style={{ width: 34, height: 34, border: '1.5px solid #ccc', borderRadius: 6, boxShadow: '0 0 3px rgba(0,0,0,0.13)', backgroundColor: col }}
                      title={col}
                    />
                  ))}
                </div>
              </div>
            </label>
            <label style={{ color: '#232323', fontWeight: 600, fontSize: '1.08rem', marginBottom: 2 }}>Tipo de tela:
              <select style={{ padding: '0.7rem', borderRadius: 8, border: '1.5px solid #cccccc', fontFamily: 'Montserrat', fontSize: '1.08rem', marginTop: 8, width: '100%' }}>
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
            <label className="logo-section" style={{ color: '#232323', fontWeight: 600, fontSize: '1.08rem', marginBottom: 2 }}>Logo:
              <label htmlFor="logo-input" className="boton-logo" style={{ fontSize: 22, width: 40, height: 40, cursor: 'pointer', marginLeft: 10 }}>
                ➕
              </label>
              <input
                id="logo-input"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleLogo}
              />
              {logo && <p style={{ marginTop: 10, fontSize: 14, color: '#444' }}>{logo.name}</p>}
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Vista previa del logo"
                  style={{ marginTop: 16, maxWidth: 120, maxHeight: 120, border: '1.5px solid #cccccc', borderRadius: 8 }}
                />
              )}
            </label>
            <label style={{ color: '#232323', fontWeight: 600, fontSize: '1.08rem', marginBottom: 2 }}>Costo:
              <input type="number" style={{ padding: '0.7rem', borderRadius: 8, border: '1.5px solid #cccccc', fontFamily: 'Montserrat', fontSize: '1.08rem', marginTop: 8, width: '100%' }} />
            </label>
            <div style={{ marginTop: '2.5rem', textAlign: 'right' }}>
              <button className="edna-btn" style={{ padding: '0.9rem 2.5rem', fontSize: '1.15rem' }}>Confirmar ➤</button>
            </div>
          </div>
        </main>
      </div>
>>>>>>> feature/jessi
    </div>
  );
};

export default FormularioDiseno;
