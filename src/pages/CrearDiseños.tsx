import React, { useState, useEffect } from 'react';
import './CrearDiseños.css'; // Import the CSS file for styling

// Define the interfaces for the data types
interface DesignItem {
  id: number;
  type: 'Accesorio' | 'Sombrero' | 'Parte superior' | 'Parte inferior' | 'Zapatos'; // Original broad type
  selectedType: string; // The specific type selected from the dropdown
  colors: string[];
  selectedColor: string;
  selectedFabric: string;
  selectedSize: string;
  logo: string; // URL or base64 for the logo
  cost: number;
}

interface FabricOption {
  value: string;
  label: string;
  logoBaseUrl: string; // Base URL for the logo image based on fabric
}

const App: React.FC = () => {
  // Predefined options for selectors
  const colorOptions = ['Rojo', 'Azul', 'Verde', 'Negro', 'Blanco'];
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
      selectedType: 'Lentes', // Specific type selected by default
      colors: colorOptions,
      selectedColor: 'Rojo',
      selectedFabric: 'algodon',
      selectedSize: 'M',
      logo: '', // Will be calculated dynamically
      cost: 0, // Will be calculated dynamically
    },
    {
      id: 2,
      type: 'Sombrero',
      selectedType: 'Gorra', // Specific type selected by default
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
      selectedType: 'Camiseta', // Specific type selected by default
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
      selectedType: 'Pantalones', // Specific type selected by default
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
      selectedType: 'Zapatillas', // Specific type selected by default
      colors: colorOptions,
      selectedColor: 'Blanco',
      selectedFabric: 'lana',
      selectedSize: 'XL',
      logo: '',
      cost: 0,
    },
  ]);

  // State for total cost
  const [totalCost, setTotalCost] = useState<number>(0);

  // Function to generate the clothing image URL for the sidebar
  const generateClothingImageUrl = (type: string, fabric: string, color: string): string => {
    // These URLs are placeholders. You should replace them with your own images.
    const baseUrl = "https://placehold.co/150x150/";
    const typeCode = type.substring(0, 2).toUpperCase(); // Use selectedType for image
    const fabricCode = fabric.substring(0, 2).toUpperCase();
    const colorCode = color.substring(0, 2).toUpperCase();
    const bgColor = {
      'Rojo': 'FF0000', 'Azul': '0000FF', 'Verde': '00FF00', 'Negro': '000000', 'Blanco': 'FFFFFF'
    }[color] || 'CCCCCC'; // Background color based on selected color
    const textColor = (bgColor === '000000' || bgColor === '0000FF') ? 'FFFFFF' : '000000'; // White text for dark backgrounds

    return `${baseUrl}${bgColor}/${textColor}?text=${typeCode}+${fabricCode}+${colorCode}`;
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

  // Effect to calculate individual cost, update logo, and total cost
  useEffect(() => {
    let currentTotalCost = 0;
    const updatedDesigns = designs.map(design => {
      // Use design.selectedType for cost calculation and image generation
      const newCost = calculateCost(design.selectedType, design.selectedFabric, design.selectedSize);
      const selectedFabricOption = fabricOptions.find(f => f.value === design.selectedFabric);
      const newLogo = selectedFabricOption ? selectedFabricOption.logoBaseUrl : 'https://placehold.co/50x50/E0E0E0/000?text=N/A'; // Default logo
      currentTotalCost += newCost;
      return { ...design, cost: newCost, logo: newLogo };
    });

    setDesigns(updatedDesigns);
    setTotalCost(parseFloat(currentTotalCost.toFixed(2))); // Update total cost
  }, [
    // Dependencies for recalculation: any change in relevant design properties
    designs.map(d => `${d.selectedType}-${d.selectedFabric}-${d.selectedSize}-${d.selectedColor}`).join(',')
  ]);

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

  const handleSaveDesign = () => {
    console.log('Diseños guardados:', designs);
    // Add logic here to send designs to the backend
  };

  const handleAddToCartAll = () => {
    console.log('Adding all designs to cart:', designs);
    // Logic to add all designs to the cart
  };

  return (
    <div className="editor-container">
      {/* Embedded CSS for styling */}
      <style>
        {`
          /* designEditor.css */

          /* Ensure body and html take full viewport height */
          html, body, #root { /* Assumes #root is your React root div ID */
            height: 100%;
            margin: 0;
            padding: 0;
          }

          body {
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6;
            color: #333;
          }

          .editor-container {
            height: 100%; /* Ensure it takes 100% of available height */
            display: flex;
            flex-direction: column;
            padding: 1rem;
            box-sizing: border-box; /* Include padding in total width */
          }

          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding: 0 1rem;
            flex-shrink: 0; /* Prevent header from shrinking */
          }

          .header h1 {
            font-size: 2.5rem;
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

          .main-content {
            display: flex;
            flex-grow: 1; /* Allow main content to take all remaining vertical space */
            gap: 1rem;
            min-height: 0; /* Crucial for flex-grow children to shrink correctly */
          }

          .sidebar {
            width: 200px;
            background-color: #fff;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            display: flex;
            flex-direction: column; /* Stack elements vertically */
            justify-content: flex-start; /* Align elements to the start */
            align-items: center;
            gap: 1rem; /* Space between sidebar elements */
            flex-shrink: 0; /* Prevent sidebar from shrinking */
            overflow-y: auto; /* Allow scrolling if many images */
          }

          .nav-item {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 0.75rem;
            border-radius: 0.375rem;
            color: #555;
            text-decoration: none;
            transition: background-color 0.2s ease;
          }

          .nav-item:hover {
            background-color: #f0f0f0;
          }

          .nav-item svg {
            margin-right: 0.5rem;
          }

          .clothing-display-image {
            width: 150px; /* Larger size for clothing images */
            height: 150px;
            object-fit: contain;
            border-radius: 0.5rem;
            border: 1px solid #ddd;
            margin-top: 0.5rem; /* Space between images */
          }


          .design-table-section {
            flex-grow: 1; /* Allow this section to take remaining space in main-content */
            background-color: #fff;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            padding: 1.5rem;
            /* Padding-bottom must be sufficient for absolute buttons */
            padding-bottom: 5.5rem; /* Adjusted to leave space for buttons */
            position: relative;
            display: flex;
            flex-direction: column; /* Stack table wrapper and leave space for buttons */
            min-height: 0; /* Crucial for shrinking if necessary */
          }

          .design-table-wrapper {
            flex-grow: 1; /* Allow table wrapper to take remaining space */
            display: flex; /* Becomes flex container for the table */
            flex-direction: column; /* Table stacks vertically */
            min-height: 0; /* Crucial for table to use flex-grow */
            /* Removed overflow: hidden, as tbody will handle this */
          }

          .design-table {
            width: 100%;
            border-collapse: collapse;
            display: flex; /* Table itself is a flex container */
            flex-direction: column; /* Stacks thead and tbody */
            flex-grow: 1; /* Allow table to expand within its wrapper */
            min-height: 0; /* Crucial for tbody to use overflow-y: auto */
          }

          .design-table thead {
            /* Do not change to display: block; must follow thead semantics for table-layout: fixed */
            display: table; /* So columns align with tbody */
            width: 100%;
            table-layout: fixed; /* Ensures consistent column widths */
            flex-shrink: 0; /* Prevent thead from shrinking */
          }

          .design-table tbody {
            display: block; /* Important for tbody to be a scrollable block */
            flex-grow: 1; /* Allow tbody to take all remaining vertical space */
            overflow-y: auto; /* Enable vertical scrolling in the table body */
            width: 100%;
          }

          .design-table tr {
            /* Rows inside tbody must be display: table for table-layout: fixed to work */
            display: table; /* Ensures rows behave as table rows for fixed widths */
            width: 100%;
            table-layout: fixed; /* This is key for cells to inherit widths */
          }

          .design-table th,
          .design-table td {
            /* Cells must be table-cell */
            display: table-cell;
            padding: 0.8rem 0.5rem;
            text-align: left;
            border-bottom: 1px solid #eee;
            white-space: nowrap;
          }

          /* Column Widths (These percentages should add up to 100% and match your table columns) */
          .design-table th:nth-child(1), .design-table td:nth-child(1) { width: 10%; } /* View */
          .design-table th:nth-child(2), .design-table td:nth-child(2) { width: 15%; } /* Type */
          .design-table th:nth-child(3), .design-table td:nth-child(3) { width: 15%; } /* Color(s) */
          .design-table th:nth-child(4), .design-table td:nth-child(4) { width: 15%; } /* Fabric */
          .design-table th:nth-child(5), .design-table td:nth-child(5) { width: 10%; } /* Size */
          .design-table th:nth-child(6), .design-table td:nth-child(6) { width: 10%; } /* Logo */
          .design-table th:nth-child(7), .design-table td:nth-child(7) { width: 15%; } /* Cost */

          .design-table td select {
            width: 100%;
            padding: 0.4rem 0.6rem;
            border: 1px solid #ccc;
            border-radius: 0.3rem;
            font-size: 0.9rem;
          }

          .design-image {
            width: 50px;
            height: 50px;
            object-fit: contain;
            border-radius: 0.3rem;
          }

          .cost-display {
            font-weight: bold;
            color: #007bff;
          }

          .save-design-button {
            background-color: #28a745;
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.375rem;
            border: none;
            cursor: pointer;
            font-weight: 600;
            transition: background-color 0.2s ease;
            position: absolute; /* Absolute positioning */
            bottom: 1.5rem; /* Distance from bottom */
            left: 1.5rem; /* Distance from left */
            min-width: 150px; /* Minimum width for button */
          }

          .save-design-button:hover {
            background-color: #218838;
          }

          .summary-actions {
            display: flex;
            justify-content: flex-end; /* Align elements to the right */
            align-items: center;
            position: absolute; /* Absolute positioning */
            bottom: 1.5rem; /* Distance from bottom */
            right: 1.5rem; /* Distance from right */
          }

          .total-cost-display {
            font-size: 1.5rem;
            font-weight: bold;
            color: #333;
            margin-right: 2rem; /* Space between total cost and button */
          }

          .add-to-cart-button {
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

          .add-to-cart-button:hover {
            background-color: #0056b3;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .main-content {
              flex-direction: column;
            }
            .sidebar {
              width: 100%;
              order: -1; /* Move sidebar up on mobile */
              margin-bottom: 1rem;
              flex-direction: row; /* In a row for small screens */
              flex-wrap: wrap; /* Allow images to wrap */
              justify-content: center;
            }
            .clothing-display-image {
              width: 100px;
              height: 100px;
            }
            /* Buttons become static on mobile */
            .save-design-button {
              position: static;
              width: 100%;
              margin-top: 1.5rem; /* Add space above it */
              margin-bottom: 1.5rem; /* Add space below it to separate from summary */
            }
            .summary-actions {
              position: static;
              width: 100%;
              flex-direction: column; /* Stack cost and button */
              align-items: flex-end; /* Align to the right */
              gap: 1rem;
              margin-top: 0; /* No need for margin-top if save button has margin-bottom */
              padding-right: 0;
            }
            .total-cost-display {
              margin-right: 0;
            }
            .design-table-section {
              padding-bottom: 1.5rem; /* Revert padding for static buttons on mobile */
            }
            /* Removed design-table-wrapper margin-bottom */
          }

          @media (max-width: 480px) {
            .header h1 {
              font-size: 1.8rem;
            }
            .header-links a {
              margin-left: 1rem;
            }
            .save-design-button, .add-to-cart-button {
              padding: 0.6rem 1rem;
              font-size: 0.9rem;
            }
            .design-table th, .design-table td {
              font-size: 0.8rem;
              padding: 0.6rem 0.3rem;
            }
            .design-image {
              width: 40px;
              height: 40px;
            }
            .sidebar {
              padding: 0.5rem;
            }
          }
        `}
      </style>

      {/* Header */}
      <header className="header">
        <h1>Edna Moda</h1>
        <div className="header-links">
          <a href="#" className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            Usuario
          </a>
        </div>
      </header>

      {/* Main content */}
      <div className="main-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div>
            <a href="#" className="nav-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-t-shirt"><path d="M7 21h10"/><path d="M12 17v4"/><path d="M17 21v-4H7v4"/><path d="M9.4 17a2 2 0 0 1-2.8 0L2 12V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6l-4.6 5a2 2 0 0 1-2.8 0"/></svg>
              Mis diseños
            </a>
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
          {/* Save design button */}
          <button onClick={handleSaveDesign} className="save-design-button">
            Guardar diseño
          </button>

          {/* Total cost and Add to cart button at bottom right */}
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
