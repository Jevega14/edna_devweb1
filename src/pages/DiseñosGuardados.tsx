import React, { useState } from 'react';
import './DiseñosGuardados.css'; 

const App: React.FC = () => {
  // Estado y función para mostrar mensajes en la UI (reemplazo de alert)
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  // Interfaz para un elemento de diseño
  interface DesignItem {
    id: string; // Usamos string para IDs para mayor flexibilidad (ej. UUIDs)
    name: string;
    imageUrl: string;
    selected: boolean;
  }

  // Estado para la lista de diseños
  const [designs, setDesigns] = useState<DesignItem[]>([
    { id: 'design-1', name: 'Diseño boda', imageUrl: 'https://placehold.co/120x120/AEC6CF/000?text=BODA', selected: false },
    { id: 'design-2', name: 'Diseño azul', imageUrl: 'https://placehold.co/120x120/6495ED/FFF?text=AZUL', selected: false },
    { id: 'design-3', name: 'Diseño 1', imageUrl: 'https://placehold.co/120x120/FFD700/000?text=DISE%C3%91O1', selected: false },
    { id: 'design-4', name: 'Diseño final', imageUrl: 'https://placehold.co/120x120/90EE90/000?text=FINAL', selected: false },
    // Puedes añadir más diseños aquí
  ]);

  // Manejador para el botón "Editar" de un diseño
  const handleEditDesign = (designId: string) => {
    console.log(`Editar diseño con ID: ${designId}`);
    // Lógica para navegar a la página de edición de ese diseño
    const message = `Navegar a la edición del diseño: ${designId}`;
    displayMessage(message);
  };

  // Manejador para la selección de un diseño (checkbox)
  const handleSelectDesign = (designId: string) => {
    setDesigns(prevDesigns =>
      prevDesigns.map(design =>
        design.id === designId ? { ...design, selected: !design.selected } : design
      )
    );
  };

  // Manejador para seleccionar/deseleccionar todos los diseños
  const handleSelectAllDesigns = () => {
    const allSelected = designs.every(design => design.selected);
    setDesigns(prevDesigns =>
      prevDesigns.map(design => ({
        ...design,
        selected: !allSelected, // Si todos están seleccionados, deseleccionar; de lo contrario, seleccionar todos
      }))
    );
  };

  // Manejador para el botón "Crear nuevo diseño"
  const handleCreateNewDesign = () => {
    console.log('Crear nuevo diseño');
    // Lógica para crear un nuevo diseño o navegar a un formulario de creación
    displayMessage('Funcionalidad para crear nuevo diseño pendiente.');
  };

  // Manejador para el botón "Añadir al carrito" (para los diseños seleccionados)
  const handleAddToCart = () => {
    const selectedDesigns = designs.filter(design => design.selected);
    if (selectedDesigns.length > 0) {
      const designNames = selectedDesigns.map(design => `"${design.name}"`).join(', ');
      console.log('Añadir al carrito:', selectedDesigns);
      // Lógica para añadir los diseños seleccionados al carrito
      displayMessage(`${designNames} añadido(s) al carrito.`);
    } else {
      displayMessage('Por favor, selecciona al menos un diseño para añadir al carrito.');
    }
  };

  // Manejador para el botón "Eliminar de mis diseños" (para los diseños seleccionados)
  const handleRemoveDesign = () => {
    const selectedDesigns = designs.filter(design => design.selected);
    if (selectedDesigns.length > 0) {
      const designNames = selectedDesigns.map(design => `"${design.name}"`).join(', ');
      console.log('Eliminar de mis diseños:', selectedDesigns);
      // Lógica para eliminar los diseños seleccionados
      setDesigns(prevDesigns => prevDesigns.filter(design => !design.selected));
      displayMessage(`${designNames} eliminado(s) de mis diseños.`);
    } else {
      displayMessage('Por favor, selecciona al menos un diseño para eliminar.');
    }
  };

  const displayMessage = (msg: string) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setMessage('');
    }, 3000); // El mensaje desaparecerá después de 3 segundos
  };


  return (
    <div className="gallery-container">
      {showMessage && (
        <div className="message-box" style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#333',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '5px',
          zIndex: 1000,
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          {message}
        </div>
      )}

      {/* Encabezado */}
      <header className="header">
        <h1>Edna Moda</h1>
        <div className="header-links">
          <h2>Mis diseños</h2>
          <a href="#" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Usuario
          </a>
        </div>
      </header>

      {/* Contenido principal de la galería */}
      <main className="main-content-gallery">
        <div className="design-cards-grid">
          {designs.map(design => (
            <div key={design.id} className="design-card">
              {/* Botón Editar */}
              <button onClick={() => handleEditDesign(design.id)} className="edit-button">
                Editar
              </button>
              <img
                src={design.imageUrl}
                alt={design.name}
                className="design-card-image"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://placehold.co/120x120/E0E0E0/000?text=Error";
                }}
              />
              <h3 className="design-card-title">{design.name}</h3>
              {/* Checkbox para seleccionar */}
              <label className="select-radio-group">
                <input
                  type="checkbox" // Cambiado a checkbox
                  name="selectedDesign"
                  checked={design.selected}
                  onChange={() => handleSelectDesign(design.id)}
                />
                Seleccionar
              </label>
            </div>
          ))}
        </div>

        {/* Acciones inferiores */}
        <div className="bottom-actions">
          <div className="left-actions">
            {/* Botón Crear nuevo diseño */}
            <button onClick={handleCreateNewDesign} className="create-design-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
              Crear nuevo diseño
            </button>
            {/* Botón Seleccionar todos */}
            <button onClick={handleSelectAllDesigns} className="add-to-cart-button-gallery" style={{ marginLeft: '1rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-square"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Seleccionar todos
            </button>
          </div>

          <div className="right-action-buttons">
            {/* Botón Añadir al carrito */}
            <button onClick={handleAddToCart} className="add-to-cart-button-gallery">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              Añadir diseño al carrito
            </button>
            {/* Botón Eliminar de mis diseños */}
            <button onClick={handleRemoveDesign} className="remove-design-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              Eliminar de mis diseños
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
