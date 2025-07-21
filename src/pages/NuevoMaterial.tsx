import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/NuevoMaterial.css';

const NuevoMaterial: React.FC = () => {
  const navigate = useNavigate();
  // Estados para cada campo del formulario
  const [tela, setTela] = useState('');
  const [color, setColor] = useState('');
  const [costo, setCosto] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGuardar = async () => {
    setError(null);
    setIsLoading(true);

    // Obtenemos el token y el ID del admin desde localStorage
    const token = localStorage.getItem('authToken');
    const adminId = localStorage.getItem('adminId'); // Asumimos que guardas esto en el login de admin

    if (!token || !adminId) {
      setError('Debes iniciar sesión como administrador para agregar materiales.');
      setIsLoading(false);
      return;
    }

    // Validación de campos vacíos
    if (!tela.trim() || !color.trim() || !costo.trim()) {
      setError('Todos los campos son obligatorios.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/materiales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Enviamos el token para la autenticación
        },
        body: JSON.stringify({
          tela: tela,
          color: color,
          costo: parseFloat(costo), // Convertimos el costo a número
          administrador_id: parseInt(adminId) // Convertimos el ID a número
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al guardar el material.');
      }

      alert('¡Material agregado exitosamente!');
      navigate('/inventario'); // Redirigimos al inventario después de guardar

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', background: '#f5f5f5', minHeight: '100vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '4.5rem' }}>
        <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(35,35,35,0.10)', padding: '2.5rem 2.2rem', maxWidth: 480, width: '100%' }}>
          <h2 style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#232323', margin: 0, letterSpacing: '1px', textAlign: 'center', marginBottom: '2rem' }}>Añadir Nuevo Material</h2>

          {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#232323', fontWeight: 600, display: 'block', marginBottom: 8 }} htmlFor="tela">Tipo de Tela</label>
            <input
                id="tela"
                type="text"
                value={tela}
                onChange={(e) => setTela(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1.5px solid #cccccc', fontSize: '1rem' }}
                placeholder="Ej: Algodón, Seda, Lino"
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#232323', fontWeight: 600, display: 'block', marginBottom: 8 }} htmlFor="color">Color</label>
            <input
                id="color"
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1.5px solid #cccccc', fontSize: '1rem' }}
                placeholder="Ej: Rojo, Azul Marino"
            />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ color: '#232323', fontWeight: 600, display: 'block', marginBottom: 8 }} htmlFor="costo">Costo</label>
            <input
                id="costo"
                type="number"
                value={costo}
                onChange={(e) => setCosto(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1.5px solid #cccccc', fontSize: '1rem' }}
                placeholder="Ej: 25000.50"
            />
          </div>

          <button className="edna-btn" style={{ width: '100%' }} onClick={handleGuardar} disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar Material'}
          </button>
          <button className="edna-btn" style={{ width: '100%', marginTop: '1rem', background: '#6c757d', borderColor: '#6c757d' }} onClick={() => navigate('/inventario')}>
            Cancelar
          </button>
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#232323', fontWeight: 600, display: 'block', marginBottom: 6 }}>Imagen del material</label>
          <input type="file" accept="image/*" onChange={handleImagen} style={{ marginBottom: 10 }} />
          {imagenPreview && (
            <img src={imagenPreview} alt="Vista previa" style={{ marginTop: 12, maxWidth: '100%', maxHeight: 200, border: '1.5px solid #cccccc', borderRadius: 10 }} />
          )}

        <button className="edna-btn" style={{ width: '100%', marginTop: '0.5rem' }} onClick={handleGuardar}>Guardar</button>
                </div>
                  <div className="center-action">
            <button
              className="edna-btn"
              onClick={() => navigate('/inventario')}
            >
              ↩ Volver
            </button>
          </div>
        
      </div>
  );
};

export default NuevoMaterial;

