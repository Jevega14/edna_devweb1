import React, { useState } from 'react';
import './CarritoCompra.css';

const CarritoCompra: React.FC = () => {
    const [selectedDesigns, setSelectedDesigns] = useState<string[]>([]);
    const allDesigns = ['Diseño boda', 'Diseño azul', 'Diseño 1', 'Diseño final'];

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedDesigns(allDesigns);
        } else {
            setSelectedDesigns([]);
        }
    };

    const handleDesignSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedDesigns((prevSelected) => [...prevSelected, value]);
        } else {
            setSelectedDesigns((prevSelected) =>
                prevSelected.filter((design) => design !== value)
            );
        }
    };

    return (
        <div className="cart-container">
            <header className="cart-header">
                <h1>EdnaModa</h1>
                <div className="user-info">
                    <span>👤 Usuario</span>
                </div>
            </header>

            <main className="cart-main">
                <div className="cart-header-section">
                    <h2>🛒 Carrito de compras</h2>
                    <label className="select-all-checkbox">
                        <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={selectedDesigns.length === allDesigns.length}
                        />{' '}
                        Seleccionar todos
                    </label>
                </div>

                <div className="cart-items">
                    {allDesigns.map((design) => (
                        <div className="cart-item-card" key={design}>
              <span className="item-icon">
                {design === 'Diseño boda'
                    ? '👕'
                    : design === 'Diseño azul'
                        ? '👖'
                        : design === 'Diseño 1'
                            ? '👗'
                            : '👚'}
              </span>
                            <p>{design}</p>
                            <input
                                type="checkbox" // Changed to checkbox for individual selection
                                value={design}
                                checked={selectedDesigns.includes(design)}
                                onChange={handleDesignSelect}
                            />{' '}
                            Seleccionar
                        </div>
                    ))}
                </div>

                <div className="cart-actions-right"> {/* Renamed for better clarity */}
                    <button
                        className="action-button delete-button"
                        onClick={() => alert('Eliminar del carrito: ' + selectedDesigns.join(', ') || 'Ningún diseño seleccionado')}
                    >
                        🗑️ Eliminar del carrito
                    </button>
                    <button
                        className="action-button order-button"
                        onClick={() => alert('Realizar pedido de: ' + selectedDesigns.join(', ') || 'Ningún diseño seleccionado')}
                    >
                        🔒 Realizar pedido
                    </button>
                </div>
            </main>

            <footer className="cart-footer">
                <button className="back-button" onClick={() => alert('Volver')}>
                    ↩️ Volver
                </button>
            </footer>
        </div>
    );
};

export default CarritoCompra;