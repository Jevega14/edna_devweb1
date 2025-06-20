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
      {/* Estilos CSS incluidos directamente aquí para evitar problemas de resolución de archivos externos */}
      <style>
        {`
        /* DiseñosGuardados.css */

        /* Reseteo y configuración global */
        html {
          box-sizing: border-box;
          height: 100%;
        }

        *, *::before, *::after {
          box-sizing: inherit;
        }

        body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          background-color: #f3f4f6;
          color: #333;
        }

        /* Contenedor principal de la galería */
        .gallery-container {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 1rem;
        }

        /* Encabezado */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding: 0 1rem;
          flex-shrink: 0;
        }

        .header h1 {
          font-size: 2.25rem;
          font-weight: bold;
          color: #555;
          margin: 0;
        }

        .header-links a {
          margin-left: 1.5rem;
          color: #007bff;
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        /* Contenedor del contenido principal (el recuadro blanco) */
        .main-content-gallery {
          flex: 1;
          display: flex;
          flex-direction: column;
          background-color: #fff;
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          min-height: 0;
        }

        /* Cuadrícula de tarjetas de diseño */
        .design-cards-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          overflow-y: auto;
          padding: 1.5rem;
          min-height: 0;
        }

        /* Contenedor para las acciones inferiores */
        .bottom-actions {
          flex-shrink: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-top: 1px solid #e5e7eb;
        }

        /* Contenedor para acciones de la izquierda (Crear nuevo diseño, Seleccionar todos) */
        .left-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .design-card {
          background-color: #f9f9f9;
          border: 1px solid #ddd;
          border-radius: 0.5rem;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .design-card-image {
          width: 120px;
          height: 120px;
          object-fit: contain;
          margin-bottom: 0.75rem;
          border-radius: 0.375rem;
          border: 1px solid #eee;
        }

        .design-card-title {
          font-weight: 600;
          margin-bottom: 0.75rem;
          color: #333;
        }

        .edit-button {
          background-color: #007bff;
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 0.3rem;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 500;
          transition: background-color 0.2s ease;
          margin-bottom: 0.75rem;
        }

        .edit-button:hover {
          background-color: #0056b3;
        }

        .select-radio-group {
          display: flex;
          align-items: center;
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: #555;
        }

        .select-radio-group input[type="checkbox"] {
          margin-right: 0.5rem;
        }

        .create-design-button {
          background-color: #28a745;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .create-design-button:hover {
          background-color: #218838;
        }

        .right-action-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .add-to-cart-button-gallery,
        .remove-design-button {
          background-color: #007bff;
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.375rem;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .add-to-cart-button-gallery:hover {
          background-color: #0056b3;
        }

        .remove-design-button {
          background-color: #dc3545;
        }

        .remove-design-button:hover {
          background-color: #c82333;
        }

        /* Ajustes responsivos */
        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }
          .header-links {
            width: 100%;
            justify-content: flex-end;
          }
          .header-links a {
            margin-left: 1rem;
          }
          .design-cards-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
            padding: 1rem;
          }
          .bottom-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
            padding: 1rem;
          }
          .left-actions, .right-action-buttons {
            width: 100%;
            justify-content: center;
          }
          
          .create-design-button, .add-to-cart-button-gallery, .remove-design-button {
              justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .header h1 {
            font-size: 1.8rem;
          }
          .design-cards-grid {
            grid-template-columns: 1fr;
          }
        }
        `}
      </style>

      {/* Mensaje de la UI (reemplazo de alert) */}
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
              Añadir al carrito
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
