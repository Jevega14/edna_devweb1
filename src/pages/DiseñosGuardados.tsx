import React, { useState } from 'react';
import './DiseñosGuardados.css'
// Interfaz para un elemento de diseño
interface DesignItem {
  id: string; // Usamos string para IDs para mayor flexibilidad (ej. UUIDs)
  name: string;
  imageUrl: string;
  selected: boolean;
}

const App: React.FC = () => {
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
    alert(`Navegar a la edición del diseño: ${designId}`);
  };

  // Manejador para la selección de un diseño (radio button)
  const handleSelectDesign = (designId: string) => {
    setDesigns(prevDesigns =>
      prevDesigns.map(design => ({
        ...design,
        selected: design.id === designId, // Solo este diseño será seleccionado
      }))
    );
  };

  // Manejador para el botón "Crear nuevo diseño"
  const handleCreateNewDesign = () => {
    console.log('Crear nuevo diseño');
    // Lógica para crear un nuevo diseño o navegar a un formulario de creación
    alert('Funcionalidad para crear nuevo diseño pendiente.');
  };

  // Manejador para el botón "Añadir al carrito" (para el diseño seleccionado)
  const handleAddToCart = () => {
    const selectedDesign = designs.find(design => design.selected);
    if (selectedDesign) {
      console.log('Añadir al carrito:', selectedDesign);
      // Lógica para añadir el diseño seleccionado al carrito
      alert(`"${selectedDesign.name}" añadido al carrito.`);
    } else {
      alert('Por favor, selecciona un diseño para añadir al carrito.');
    }
  };

  // Manejador para el botón "Eliminar de mis diseños" (para el diseño seleccionado)
  const handleRemoveDesign = () => {
    const selectedDesign = designs.find(design => design.selected);
    if (selectedDesign) {
      console.log('Eliminar de mis diseños:', selectedDesign);
      // Lógica para eliminar el diseño seleccionado
      setDesigns(prevDesigns => prevDesigns.filter(design => design.id !== selectedDesign.id));
      alert(`"${selectedDesign.name}" eliminado de mis diseños.`);
    } else {
      alert('Por favor, selecciona un diseño para eliminar.');
    }
  };

  return (
    <div className="gallery-container">
      {/* Encabezado */}
      <header className="header">
        <h1>Edna Moda</h1>
        <div className="header-links">
          {/* El botón "Mis diseños" de la barra lateral ahora es el título de la página */}
          <h2>Mis diseños</h2>
          <a href="#" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
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
              {/* Radio button para seleccionar */}
              <label className="select-radio-group">
                <input
                  type="radio"
                  name="selectedDesign" // Mismo nombre para que solo uno pueda ser seleccionado
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
          {/* Botón Crear nuevo diseño */}
          <button onClick={handleCreateNewDesign} className="create-design-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
            Crear nuevo diseño
          </button>

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
