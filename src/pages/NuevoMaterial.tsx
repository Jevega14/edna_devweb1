import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/NuevoMaterial.css';

const NuevoMaterial: React.FC = () => {
  const navigate = useNavigate();

  const [tela, setTela] = useState('');
  const [costo, setCosto] = useState('');

  // Estados para el selector de color
  const [currentColor, setCurrentColor] = useState('#ff0000'); // Color seleccionado en el picker
  const [selectedColors, setSelectedColors] = useState<string[]>([]); // Lista de colores añadidos

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Función para añadir un color a la lista
  const addColor = () => {
    if (currentColor && !selectedColors.includes(currentColor)) {
      setSelectedColors([...selectedColors, currentColor]);
    }
  };

  // Función para eliminar un color de la lista al hacer clic en él
  const removeColor = (colorToRemove: string) => {
    setSelectedColors(selectedColors.filter(color => color !== colorToRemove));
  };

  const handleGuardar = async () => {
    setError(null);
    setIsLoading(true);

    const token = localStorage.getItem('authToken');
    const adminId = localStorage.getItem('adminId');

    if (!token || !adminId) {
      setError('Debes iniciar sesión como administrador.');
      setIsLoading(false);
      return;
    }

    if (!tela.trim() || selectedColors.length === 0 || !costo.trim()) {
      setError('Tela, al menos un color y costo son obligatorios.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/materiales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tela: tela,
          // Unimos el array de colores en un solo string para guardarlo
          color: selectedColors.join(', '),
          costo: parseFloat(costo),
          administrador_id: parseInt(adminId)
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al guardar el material.');
      }

      alert('¡Material agregado exitosamente!');
      navigate('/inventario');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="form-container-page">
        <div className="form-card">
          <h2 className="form-title">Añadir Nuevo Material</h2>

          {error && <p className="form-error">{error}</p>}

          <div className="form-group">
            <label className="form-label" htmlFor="tela">Tipo de Tela</label>
            <input
                id="tela"
                type="text"
                value={tela}
                onChange={(e) => setTela(e.target.value)}
                className="form-input"
                placeholder="Ej: Algodón, Seda, Lino"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="color">Color(es)</label>
            <div className="color-picker-container">
              <input
                  id="color"
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="color-picker-input"
              />
              <button onClick={addColor} className="add-color-btn">Añadir</button>
            </div>
            <div className="color-swatch-container">
              {selectedColors.map((color, index) => (
                  <div
                      key={index}
                      className="color-swatch"
                      style={{ backgroundColor: color }}
                      onClick={() => removeColor(color)}
                      title={`Quitar ${color}`}
                  />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="costo">Costo</label>
            <input
                id="costo"
                type="number"
                value={costo}
                onChange={(e) => setCosto(e.target.value)}
                className="form-input"
                placeholder="Ej: 25000.50"
            />
          </div>

          <div className="form-actions">
            <button className="edna-btn" onClick={handleGuardar} disabled={isLoading}>
              {isLoading ? 'Guardando...' : 'Guardar Material'}
            </button>
            <button className="edna-btn edna-btn-secondary" onClick={() => navigate('/inventario')}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
  );
};

export default NuevoMaterial;