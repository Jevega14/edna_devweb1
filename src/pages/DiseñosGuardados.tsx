
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/DiseñosGuardados.css';

const DiseñosGuardados: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  interface DesignItem {
    id: string;
    name: string;
    imageUrl: string;
    selected: boolean;
  }

  const [designs, setDesigns] = useState<DesignItem[]>([
    { id: 'design-1', name: 'Diseño boda',   imageUrl: 'https://placehold.co/120x120/AEC6CF/000?text=BODA',   selected: false },
    { id: 'design-2', name: 'Diseño azul',   imageUrl: 'https://placehold.co/120x120/6495ED/FFF?text=AZUL',   selected: false },
    { id: 'design-3', name: 'Diseño 1',      imageUrl: 'https://placehold.co/120x120/FFD700/000?text=DISE%C3%91O1', selected: false },
    { id: 'design-4', name: 'Diseño final',  imageUrl: 'https://placehold.co/120x120/90EE90/000?text=FINAL',  selected: false },
  ]);

  const displayMessage = (msg: string) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  const handleEditDesign = (designId: string) => {
    // Si más adelante quieres pasar el ID, podrías usar: `/creardiseño/${designId}`
    navigate('/creardiseño');
  };

  const handleSelectDesign = (id: string) => {
    setDesigns(prev =>
      prev.map(d => d.id === id ? { ...d, selected: !d.selected } : d)
    );
  };

  const handleSelectAllDesigns = () => {
    const all = designs.every(d => d.selected);
    setDesigns(prev =>
      prev.map(d => ({ ...d, selected: !all }))
    );
  };

  const handleCreateNewDesign = () => {
    navigate('/creardiseño');
  };

  const handleAddToCart = () => {
  const selectedDesigns = designs.filter(design => design.selected);
    if (selectedDesigns.length > 0) {
      localStorage.setItem('carritoDiseños', JSON.stringify(selectedDesigns.map(d => d.name)));
      navigate('/CarritoCompra');
    } else {
      displayMessage('Por favor, selecciona al menos un diseño para añadir al carrito.');
    }
  };

  const handleRemoveDesign = () => {
    const selected = designs.filter(d => d.selected);
    if (selected.length) {
      setDesigns(prev => prev.filter(d => !d.selected));
      const names = selected.map(d => `"${d.name}"`).join(', ');
      displayMessage(`${names} eliminado(s) de mis diseños.`);
    } else {
      displayMessage('Selecciona al menos un diseño para eliminar.');
    }
  };

  return (
    <div className="gallery-container">
      {showMessage && (
        <div className="message-box">
          {message}
        </div>
      )}

      {/* Encabezado */}
      <header className="header">
        <h2>Mis diseños</h2>
      </header>

      {/* Galería */}
      <main className="main-content-gallery">
        <div className="design-cards-grid">
          {designs.map(d => (
            <div key={d.id} className="design-card">
              <button
                className="edit-button"
                onClick={() => handleEditDesign(d.id)}
              >
                Editar
              </button>
              <img
                src={d.imageUrl}
                alt={d.name}
                className="design-card-image"
                onError={e => {
                  const t = e.target as HTMLImageElement;
                  t.onerror = null;
                  t.src = "https://placehold.co/120x120/E0E0E0/000?text=Error";
                }}
              />
              <h3 className="design-card-title">{d.name}</h3>
              <label className="select-radio-group">
                <input
                  type="checkbox"
                  checked={d.selected}
                  onChange={() => handleSelectDesign(d.id)}
                /> Seleccionar
              </label>
            </div>
          ))}
        </div>

        {/* Acciones inferiores */}
        <div className="bottom-actions">
          {/* Izquierda */}
          <div className="left-actions">
            <button
              className="create-design-button"
              onClick={handleCreateNewDesign}
            >
              + Crear nuevo diseño
            </button>
            
              <button onClick={handleSelectAllDesigns} className="add-to-cart-button-gallery" style={{ marginLeft: '1rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-square"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Seleccionar todos
            </button>

          </div>

          {/* Centro: Volver */}
          <div className="center-action">
            <button
              className="edna-btn"
              onClick={() => navigate('/usuario')}
            >
              ↩ Volver
            </button>
          </div>

          {/* Derecha */}
          <div className="right-action-buttons">
            <button
              className="add-to-cart-button-gallery"
              onClick={handleAddToCart}
            >
              🛒 Añadir diseño al carrito
            </button>
            <button
              className="remove-design-button"
              onClick={handleRemoveDesign}
            >
              🗑️ Eliminar de mis diseños
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiseñosGuardados;
