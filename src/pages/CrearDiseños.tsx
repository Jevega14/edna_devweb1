import React, { useState, useEffect } from 'react';
import "./CrearDiseños.css"

// Define las interfaces para los tipos de datos
interface DesignItem {
  id: number;
  type: 'Accesorio' | 'Sombrero' | 'Parte superior' | 'Parte inferior' | 'Zapatos';
  colors: string[]; // Podría ser un array para múltiples colores o solo uno
  selectedColor: string;
  selectedFabric: string;
  selectedSize: string;
  logo: string; // URL o base64 para el logo
  cost: number;
}

interface FabricOption {
  value: string;
  label: string;
  logoBaseUrl: string; // Base URL para la imagen del logo según la tela
}

const App: React.FC = () => {
  // Opciones predefinidas para los selectores
  const colorOptions = ['Rojo', 'Azul', 'Verde', 'Negro', 'Blanco'];
  const fabricOptions: FabricOption[] = [
    { value: 'algodon', label: 'Algodón', logoBaseUrl: 'https://placehold.co/50x50/ADD8E6/000?text=AL' }, // Logo de algodón
    { value: 'poliester', label: 'Poliéster', logoBaseUrl: 'https://placehold.co/50x50/DAA520/000?text=PO' }, // Logo de poliéster
    { value: 'seda', label: 'Seda', logoBaseUrl: 'https://placehold.co/50x50/F08080/000?text=SE' },       // Logo de seda
    { value: 'lana', label: 'Lana', logoBaseUrl: 'https://placehold.co/50x50/D3D3D3/000?text=LA' },         // Logo de lana
  ];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];

  // Estado para manejar los elementos de diseño
  const [designs, setDesigns] = useState<DesignItem[]>([
    {
      id: 1,
      type: 'Accesorio',
      colors: colorOptions,
      selectedColor: 'Rojo',
      selectedFabric: 'algodon',
      selectedSize: 'M',
      logo: '', // Se calculará dinámicamente
      cost: 0, // Se calculará dinámicamente
    },
    {
      id: 2,
      type: 'Sombrero',
      colors: colorOptions,
      selectedColor: 'Azul',
      selectedFabric: 'poliester',
      selectedSize: 'M',
      logo: '',
      cost: 0,
    },
    {
      id: 3,
      type: 'Parte superior',
      colors: colorOptions,
      selectedColor: 'Verde',
      selectedFabric: 'algodon',
      selectedSize: 'L',
      logo: '',
      cost: 0,
    },
    {
      id: 4,
      type: 'Parte inferior',
      colors: colorOptions,
      selectedColor: 'Negro',
      selectedFabric: 'seda',
      selectedSize: 'S',
      logo: '',
      cost: 0,
    },
    {
      id: 5,
      type: 'Zapatos',
      colors: colorOptions,
      selectedColor: 'Blanco',
      selectedFabric: 'lana',
      selectedSize: 'XL',
      logo: '',
      cost: 0,
    },
  ]);

  // Estado para el costo total
  const [totalCost, setTotalCost] = useState<number>(0);

  // Función para generar la URL de la imagen de ropa para la barra lateral
  const generateClothingImageUrl = (type: DesignItem['type'], fabric: string, color: string): string => {
    // Estas URLs son solo placeholders. Deberías reemplazarlas con tus propias imágenes.
    const baseUrl = "https://placehold.co/150x150/";
    const typeCode = type.split(' ')[0].substring(0, 2).toUpperCase(); // Ej: AC, SO, PA, ZA
    const fabricCode = fabric.substring(0, 2).toUpperCase();
    const colorCode = color.substring(0, 2).toUpperCase();
    const bgColor = {
      'Rojo': 'FF0000', 'Azul': '0000FF', 'Verde': '00FF00', 'Negro': '000000', 'Blanco': 'FFFFFF'
    }[color] || 'CCCCCC'; // Color de fondo según el color
    const textColor = (bgColor === '000000' || bgColor === '0000FF') ? 'FFFFFF' : '000000'; // Texto blanco para fondos oscuros

    return `${baseUrl}${bgColor}/${textColor}?text=${typeCode}+${fabricCode}+${colorCode}`;
  };

  // Función para calcular el costo individual
  const calculateCost = (type: DesignItem['type'], fabric: string, size: string): number => {
    let baseCost = 0;
    // Lógica de costo base por tipo
    switch (type) {
      case 'Accesorio':
        baseCost = 10;
        break;
      case 'Sombrero':
        baseCost = 25;
        break;
      case 'Parte superior':
        baseCost = 40;
        break;
      case 'Parte inferior':
        baseCost = 35;
        break;
      case 'Zapatos':
        baseCost = 60;
        break;
      default:
        baseCost = 0;
    }

    // Ajuste de costo por tela
    switch (fabric) {
      case 'algodon':
        baseCost *= 1.0;
        break;
      case 'poliester':
        baseCost *= 1.1;
        break;
      case 'seda':
        baseCost *= 1.5;
        break;
      case 'lana':
        baseCost *= 1.3;
        break;
      default:
        break;
    }

    // Ajuste de costo por talla (ejemplo simple, las tallas más grandes son un poco más caras)
    switch (size) {
      case 'XS':
      case 'S':
        baseCost *= 1.0;
        break;
      case 'M':
        baseCost *= 1.05;
        break;
      case 'L':
        baseCost *= 1.1;
        break;
      case 'XL':
        baseCost *= 1.15;
        break;
      default:
        break;
    }
    return parseFloat(baseCost.toFixed(2)); // Redondear a 2 decimales
  };

  // Efecto para calcular el costo individual, actualizar el logo y el costo total
  useEffect(() => {
    let currentTotalCost = 0;
    const updatedDesigns = designs.map(design => {
      const newCost = calculateCost(design.type, design.selectedFabric, design.selectedSize);
      const selectedFabricOption = fabricOptions.find(f => f.value === design.selectedFabric);
      const newLogo = selectedFabricOption ? selectedFabricOption.logoBaseUrl : 'https://placehold.co/50x50/E0E0E0/000?text=N/A'; // Logo por defecto
      currentTotalCost += newCost;
      return { ...design, cost: newCost, logo: newLogo };
    });

    setDesigns(updatedDesigns);
    setTotalCost(parseFloat(currentTotalCost.toFixed(2))); // Actualiza el costo total
  }, [
    // Dependencias para re-calcular: cualquier cambio en las propiedades relevantes de los diseños
    designs.map(d => `${d.selectedFabric}-${d.selectedSize}-${d.selectedColor}`).join(',')
  ]);

  // Manejador para los cambios en los selectores de los elementos de diseño
  const handleDesignChange = (
    id: number,
    field: keyof DesignItem,
    value: string
  ) => {
    setDesigns(prevDesigns =>
      prevDesigns.map(design =>
        design.id === id ? { ...design, [field]: value } : design
      )
    );
  };

  const handleSaveDesign = () => {
    console.log('Diseños guardados:', designs);
    // Aquí puedes añadir la lógica para enviar los diseños al backend
  };

  const handleAddToCartAll = () => {
    console.log('Añadiendo todos los diseños al carrito:', designs);
    // Lógica para añadir todos los diseños al carrito
  };

  return (
    <div className="editor-container">
      {/* Encabezado */}
      <header className="header">
        <h1>Edna Moda</h1>
        <div className="header-links">
          <a href="#" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Usuario
          </a>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="main-content">
        {/* Barra lateral */}
        <aside className="sidebar">
          <div>
            <a href="#" className="nav-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-t-shirt"><path d="M7 21h10"/><path d="M12 17v4"/><path d="M17 21v-4H7v4"/><path d="M9.4 17a2 2 0 0 1-2.8 0L2 12V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6l-4.6 5a2 2 0 0 1-2.8 0"/></svg>
              Mis diseños
            </a>
          </div>
          {/* Imágenes de ropa que se actualizan dinámicamente */}
          {designs.map(design => (
            <img
              key={design.id}
              src={generateClothingImageUrl(design.type, design.selectedFabric, design.selectedColor)}
              alt={`Vista de ${design.type}`}
              className="clothing-display-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://placehold.co/150x150/E0E0E0/000?text=Error";
              }}
            />
          ))}
        </aside>

        {/* Sección de la tabla de diseños */}
        <section className="design-table-section">
          <div className="design-table-wrapper">
            <table className="design-table">
              <thead>
                <tr>
                  <th>Vista</th>
                  <th>Tipo</th>
                  <th>Color(es)</th>
                  <th>Tela</th>
                  <th>Talla</th>
                  <th>Logo</th>
                  <th>Costo</th>
                </tr>
              </thead>
              <tbody>
                {designs.map(design => (
                  <tr key={design.id}>
                    <td>
                      {/* Placeholder para la imagen de la vista */}
                      <img
                        src={`https://placehold.co/50x50/F0F0F0/000?text=${design.type.slice(0, 2)}`}
                        alt={design.type}
                        className="design-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "https://placehold.co/50x50/E0E0E0/000?text=Error";
                        }}
                      />
                    </td>
                    <td>{design.type}</td>
                    <td>
                      <select
                        value={design.selectedColor}
                        onChange={(e) => handleDesignChange(design.id, 'selectedColor', e.target.value)}
                      >
                        {design.colors.map(color => (
                          <option key={color} value={color}>
                            {color}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={design.selectedFabric}
                        onChange={(e) => handleDesignChange(design.id, 'selectedFabric', e.target.value)}
                      >
                        {fabricOptions.map(fabric => (
                          <option key={fabric.value} value={fabric.value}>
                            {fabric.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={design.selectedSize}
                        onChange={(e) => handleDesignChange(design.id, 'selectedSize', e.target.value)}
                      >
                        {sizeOptions.map(size => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      {design.logo && (
                        <img
                          src={design.logo}
                          alt="Logo de tela"
                          className="design-image"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://placehold.co/50x50/E0E0E0/000?text=Error";
                          }}
                        />
                      )}
                    </td>
                    <td className="cost-display">${design.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Botón Guardar diseño */}
          <button onClick={handleSaveDesign} className="save-design-button">
            Guardar diseño
          </button>

          {/* Costo Total y botón Añadir al carrito en la parte inferior derecha */}
          <div className="summary-actions">
            <div className="total-cost-display">
              Costo Total: ${totalCost.toFixed(2)}
            </div>
            <button
              onClick={handleAddToCartAll}
              className="add-to-cart-button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              Añadir al carrito
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
