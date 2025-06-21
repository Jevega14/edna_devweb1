import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearDiseños.css'; // Assuming you have a CSS file for styles


// Define the interfaces for the data types
interface DesignItem {
  id: number;
  type: 'Accesorio' | 'Sombrero' | 'Parte superior' | 'Parte inferior' | 'Zapatos'; // Original broad type
  selectedType: string; // The specific type selected from the dropdown
  colors: string[];
  selectedColor: string;
  selectedFabric: string;
  selectedSize: string;
  // Eliminamos 'logo' y 'costo' de aquí ya que serán valores derivados
}

interface FabricOption {
  value: string;
  label: string;
  logoBaseUrl: string; // Base URL for the logo image based on fabric
}

const App: React.FC = () => {
  const navigate = useNavigate();
  // Predefined options for selectors
  const colorOptions = ['Rojo', 'Azul', 'Verde', 'Negro', 'Blanco', 'Gris', 'Amarillo', 'Morado']; // Added more colors
  const fabricOptions: FabricOption[] = [
    { value: 'algodon', label: 'Algodón', logoBaseUrl: 'https://placehold.co/50x50/ADD8E6/000?text=AL' }, // Cotton logo
    { value: 'poliester', label: 'Poliéster', logoBaseUrl: 'https://placehold.co/50x50/DAA520/000?text=PO' }, // Polyester logo
    { value: 'seda', label: 'Seda', logoBaseUrl: 'https://placehold.co/50x50/F08080/000?text=SE' },       // Silk logo
    { value: 'lana', label: 'Lana', logoBaseUrl: 'https://placehold.co/50x50/D3D3D3/000?text=LA' },         // Wool logo
  ];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];

  // New options for the "Type" dropdown
  const typeOptions: { [key: string]: string[] } = {
    'Accesorio': ['Lentes', 'Bandana', 'Collar', 'Pulsera', 'Anillo'],
    'Sombrero': ['Gorra', 'Sombrero de sol', 'Gorro de lana', 'Boina'],
    'Parte superior': ['Camiseta', 'Sudadera', 'Camisa', 'Blusa', 'Chaleco'],
    'Parte inferior': ['Pantalones', 'Falda', 'Shorts', 'Jeans', 'Leggings'],
    'Zapatos': ['Zapatillas', 'Sandalias', 'Botas', 'Mocasines', 'Tacones'],
  };

  // State to manage design items
  const [designs, setDesigns] = useState<DesignItem[]>([
    {
      id: 1,
      type: 'Accesorio',
      selectedType: 'Lentes',
      colors: colorOptions,
      selectedColor: 'Rojo',
      selectedFabric: 'algodon',
      selectedSize: 'M',
    },
    {
      id: 2,
      type: 'Sombrero',
      selectedType: 'Gorra',
      colors: colorOptions,
      selectedColor: 'Azul',
      selectedFabric: 'poliester',
      selectedSize: 'M',
    },
    {
      id: 3,
      type: 'Parte superior',
      selectedType: 'Camiseta',
      colors: colorOptions,
      selectedColor: 'Verde',
      selectedFabric: 'algodon',
      selectedSize: 'L',
    },
    {
      id: 4,
      type: 'Parte inferior',
      selectedType: 'Pantalones',
      colors: colorOptions,
      selectedColor: 'Negro',
      selectedFabric: 'seda',
      selectedSize: 'S',
    },
    {
      id: 5,
      type: 'Zapatos',
      selectedType: 'Zapatillas',
      colors: colorOptions,
      selectedColor: 'Blanco',
      selectedFabric: 'lana',
      selectedSize: 'XL',
    },
  ]);

  // State for total cost
  const [totalCost, setTotalCost] = useState<number>(0);
  // State for a globally uploaded custom logo
  const [uploadedGlobalLogo, setUploadedGlobalLogo] = useState<string | null>(null);

  // Ref for the global file input to trigger it programmatically
  const globalFileInputRef = useRef<HTMLInputElement>(null);

  // Function to generate the clothing image URL for the sidebar
  const generateClothingImageUrl = (type: string, fabric: string, color: string): string => {
    // These URLs are placeholders. You should replace them with your own images.
    const baseUrl = "https://placehold.co/150x150/";
    const typeCode = type.substring(0, 2).toUpperCase(); // Use selectedType for image
    const fabricCode = fabric.substring(0, 2).toUpperCase();
    const colorCode = color.substring(0, 2).toUpperCase();
    const bgColorMap: { [key: string]: string } = {
      'Rojo': 'FF0000', 'Azul': '0000FF', 'Verde': '00FF00', 'Negro': '000000', 'Blanco': 'FFFFFF',
      'Gris': '808080', 'Amarillo': 'FFFF00', 'Morado': '800080'
    };
    const bgColor = bgColorMap[color] || 'CCCCCC'; // Background color based on selected color
    const textColor = (bgColor === '000000' || bgColor === '0000FF' || bgColor === '800080' || bgColor === '800080') ? 'FFFFFF' : '000000'; // White text for dark backgrounds

    return `${baseUrl}${bgColor}/${textColor}?text=${typeCode}+${fabricCode}+${colorCode}`;
  };

  // Function to get hex color code for color buttons
  const getHexColor = (colorName: string): string => {
    const colors: { [key: string]: string } = {
      'Rojo': '#FF0000',
      'Azul': '#0000FF',
      'Verde': '#00FF00',
      'Negro': '#000000',
      'Blanco': '#FFFFFF',
      'Gris': '#808080',
      'Amarillo': '#FFFF00',
      'Morado': '#800080',
    };
    return colors[colorName] || '#CCCCCC'; // Default to a light grey if color not found
  };

  // Function to calculate individual cost
  const calculateCost = (selectedType: string, fabric: string, size: string): number => {
    let baseCost = 0;
    // Cost logic based on the more specific clothing type
    switch (selectedType) {
      case 'Lentes': baseCost = 12; break;
      case 'Bandana': baseCost = 8; break;
      case 'Collar': baseCost = 15; break;
      case 'Pulsera': baseCost = 7; break;
      case 'Anillo': baseCost = 10; break;

      case 'Gorra': baseCost = 20; break;
      case 'Sombrero de sol': baseCost = 28; break;
      case 'Gorro de lana': baseCost = 22; break;
      case 'Boina': baseCost = 18; break;

      case 'Camiseta': baseCost = 30; break;
      case 'Sudadera': baseCost = 50; break;
      case 'Camisa': baseCost = 45; break;
      case 'Blusa': baseCost = 38; break;
      case 'Chaleco': baseCost = 35; break;

      case 'Pantalones': baseCost = 55; break;
      case 'Falda': baseCost = 30; break;
      case 'Shorts': baseCost = 25; break;
      case 'Jeans': baseCost = 60; break;
      case 'Leggings': baseCost = 32; break;

      case 'Zapatillas': baseCost = 70; break;
      case 'Sandalias': baseCost = 40; break;
      case 'Botas': baseCost = 80; break;
      case 'Mocasines': baseCost = 65; break;
      case 'Tacones': baseCost = 75; break;

      default:
        baseCost = 0;
    }

    // Cost adjustment by fabric
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

    // Cost adjustment by size (simple example, larger sizes are slightly more expensive)
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
    return parseFloat(baseCost.toFixed(2)); // Round to 2 decimal places
  };

  // Effect to calculate total cost
  useEffect(() => {
    let currentTotalCost = 0;
    designs.forEach(design => {
      currentTotalCost += calculateCost(design.selectedType, design.selectedFabric, design.selectedSize);
    });
    setTotalCost(parseFloat(currentTotalCost.toFixed(2))); // Update total cost
  }, [
    // Dependencias para el recálculo: cualquier cambio en las propiedades relevantes de los diseños
    designs
  ]); // Simplified dependency array to just 'designs'

  // Handler for changes in design item selectors
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

  // Handler for global logo file upload
  const handleGlobalLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedGlobalLogo(reader.result as string);
      };
      reader.readAsDataURL(file); // Read file as base64
    }
  };

  // Function to get the logo URL for a design item
  const getDesignLogoUrl = (design: DesignItem): string => {
    if (uploadedGlobalLogo) {
      return uploadedGlobalLogo;
    } else {
      const selectedFabricOption = fabricOptions.find(f => f.value === design.selectedFabric);
      return selectedFabricOption ? selectedFabricOption.logoBaseUrl : 'https://placehold.co/50x50/E0E0E0/000?text=N/A';
    }
  };

  const handleSaveDesign = () => {
    console.log('Diseños guardados:', designs);
    // Add logic here to send designs to the backend
  };

  const handleAddToCartAll = () => {
    console.log('Adding all designs to cart:', designs);
    // Logic to add all designs to the cart
  };

  // Handler to add a new design item
  const handleAddDesign = () => {
    const newId = designs.length > 0 ? Math.max(...designs.map(d => d.id)) + 1 : 1;
    setDesigns(prev => [
      ...prev,
      {
        id: newId,
        type: 'Accesorio',
        selectedType: 'Lentes',
        colors: colorOptions,
        selectedColor: 'Rojo',
        selectedFabric: 'algodon',
        selectedSize: 'M',
      }
    ]);
  };

  return (
    <div className="editor-container">
      {/* Header */}
      <header className="header" style={{ flexDirection: 'column', alignItems: 'center', marginBottom: '2rem', padding: 0 }}>
        <h2 style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#232323', margin: 0, letterSpacing: '1px', textAlign: 'center' }}>
          Crear diseño
        </h2>
      </header>

      {/* Main content */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div>
            <button className="nav-item" style={{ width: '100%' }} onClick={() => navigate('/diseñosguardados')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-t-shirt"><path d="M7 21h10"/><path d="M12 17v4"/><path d="M17 21v-4H7v4"/><path d="M9.4 17a2 2 0 0 1-2.8 0L2 12V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6l-4.6 5a2 2 0 0 1-2.8 0"/></svg>
              Mis diseños
            </button>
          </div>
          {/* Dynamically updated clothing images */}
          {designs.map(design => (
            <img
              key={design.id}
              src={generateClothingImageUrl(design.selectedType, design.selectedFabric, design.selectedColor)}
              alt={`Vista de ${design.selectedType}`}
              className="clothing-display-image"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "https://placehold.co/150x150/E0E0E0/000?text=Error";
              }}
            />
          ))}
        </aside>

        {/* Design table section */}
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
                      {/* Placeholder for the view image */}
                      <img
                        src={`https://placehold.co/50x50/F0F0F0/000?text=${design.selectedType.slice(0, 2)}`}
                        alt={design.selectedType}
                        className="design-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "https://placehold.co/50x50/E0E0E0/000?text=Error";
                        }}
                      />
                    </td>
                    <td>
                      <select
                        value={design.selectedType}
                        onChange={(e) => handleDesignChange(design.id, 'selectedType', e.target.value)}
                      >
                        {/* Render options based on the original broad type */}
                        {typeOptions[design.type].map(specificType => (
                          <option key={specificType} value={specificType}>
                            {specificType}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <div className="color-selection-container">
                        {design.colors.map(color => (
                          <div
                            key={color}
                            className={`color-button ${design.selectedColor === color ? 'selected' : ''}`}
                            style={{ backgroundColor: getHexColor(color) }}
                            onClick={() => handleDesignChange(design.id, 'selectedColor', color)}
                            title={color} // Tooltip for color name
                          ></div>
                        ))}
                      </div>
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
                      {/* Mostrar el logo derivado */}
                      <img
                        src={getDesignLogoUrl(design)}
                        alt="Logo de tela"
                        className="design-image"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "https://placehold.co/50x50/E0E0E0/000?text=Error";
                        }}
                      />
                    </td>
                    <td className="cost-display">${calculateCost(design.selectedType, design.selectedFabric, design.selectedSize).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Botón para añadir prenda/diseño debajo de la tabla */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', margin: '1.2rem 0 0.5rem 0' }}>
            <button className="edna-btn" style={{ padding: '0.5rem 1.2rem', fontSize: '1rem', minWidth: 0, width: 'auto', borderRadius: 8 }} onClick={handleAddDesign}>
              + Añadir prenda/diseño
            </button>
          </div>
          {/* Save design button */}
          <button onClick={handleSaveDesign} className="edna-btn" style={{ background: '#28a745', color: '#fff', fontWeight: 700, minWidth: 150, position: 'absolute', bottom: '1.5rem', left: '1.5rem' }}>
            Guardar diseño
          </button>

          {/* Total cost and Add to cart button at bottom right */}
          <div className="summary-actions">
            {/* Global Logo Upload Button and hidden input */}
            <input
              type="file"
              accept="image/png" // Changed accept attribute to only allow PNG
              ref={globalFileInputRef}
              onChange={handleGlobalLogoUpload}
              style={{ display: 'none' }} // Hide the input
            />
            <button
              onClick={() => globalFileInputRef.current?.click()}
              className="edna-btn"
              style={{ background: '#6c757d', color: '#fff', border: 'none', marginRight: '1rem', fontWeight: 700 }}
            >
              Subir Logo Personalizado Global
            </button>

            <div className="total-cost-display">
              Costo Total: ${totalCost.toFixed(2)}
            </div>
            <button
              onClick={handleAddToCartAll}
              className="edna-btn"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              Añadir diseño al carrito
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
