import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/CarritoCompra.css';

const CarritoCompra: React.FC = () => {
    const navigate = useNavigate();
    const [designs, setDesigns] = useState<string[]>([]);
    useEffect(() => {
        const storedDesigns = localStorage.getItem('carritoDiseños');
        if (storedDesigns) {
            setDesigns(JSON.parse(storedDesigns));
        }
    }, []);
    const [selectedDesigns, setSelectedDesigns] = useState<string[]>([]);

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedDesigns(designs);
        } else {
            setSelectedDesigns([]);
        }
    };

    const handleRealizarPedido = () => {
    if (selectedDesigns.length > 0) {
        localStorage.setItem('prendasPedido', JSON.stringify(
        selectedDesigns.map((nombre, index) => ({
            id: index + 1,
            nombre,
            cantidad: 1
        }))
        ));
        navigate('/RealizacionPedidoUser'); // ✅ redirige a la vista de pedido
    } else {
        alert('Por favor selecciona al menos una prenda antes de realizar el pedido.');
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

    const handleDeleteFromCart = () => {
        const nuevosDiseños = designs.filter(design => !selectedDesigns.includes(design));
        setDesigns(nuevosDiseños);
        setSelectedDesigns([]);
        localStorage.setItem('carritoDiseños', JSON.stringify(nuevosDiseños)); // ✅ actualiza el almacenamiento local
    };

    return (
        <div className="cart-container" style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', background: '#f5f5f5', minHeight: '100vh' }}>
            <main className="cart-main" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(35,35,35,0.10)', margin: '2.5rem auto', padding: '2.5rem 1.5rem', maxWidth: 900 }}>
                <div className="cart-header-section" style={{ width: '100%', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#232323', margin: 0, letterSpacing: '1px', textAlign: 'left' }}>🛒 Carrito de compras</h2>
                    <label className="select-all-checkbox" style={{ marginTop: '0.7rem', fontWeight: 600, color: '#232323' }}>
                        <input
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={selectedDesigns.length === designs.length}
                        />{' '}
                        Seleccionar todos
                    </label>
                </div>

                <div className="cart-items">
                    {designs.map((design) => (
                        <div className="cart-item-card" key={design} style={{ border: '1.5px solid #e0e0e0', borderRadius: 14, background: '#f5f5f5', fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif' }}>
                            <span className="item-icon" style={{ fontSize: 48, marginBottom: 10 }}>
                                {design === 'Diseño boda'
                                    ? '👕'
                                    : design === 'Diseño azul'
                                        ? '👖'
                                        : design === 'Diseño 1'
                                            ? '👗'
                                            : '👚'}
                            </span>
                            <p style={{ fontWeight: 700, color: '#232323', marginBottom: 8 }}>{design}</p>
                            <label style={{ fontSize: '1rem', color: '#444', fontWeight: 500 }}>
                                <input
                                    type="checkbox"
                                    value={design}
                                    checked={selectedDesigns.includes(design)}
                                    onChange={handleDesignSelect}
                                    style={{ marginRight: 6 }}
                                />
                                Seleccionar
                            </label>
                        </div>
                    ))}
                </div>

                <div className="cart-actions-right" style={{ position: 'static', display: 'flex', flexDirection: 'row', gap: '1.5rem', justifyContent: 'flex-end', marginTop: '2.5rem' }}>
                    <button
                        className="edna-btn"
                        style={{ background: '#dc3545', color: '#fff', border: 'none', minWidth: 180, fontWeight: 700 }}
                        onClick={handleDeleteFromCart}
                    >
                        🗑️ Eliminar del carrito
                    </button>
                    <button
                        className="edna-btn"
                        style={{ background: '#232323', color: '#cccccc', border: '2px solid #cccccc', minWidth: 180, fontWeight: 700 }}
                        onClick={handleRealizarPedido}
                    >
                        🔒 Realizar pedido
                    </button>
                              <div className="center-action">
            <button
              className="edna-btn"
              onClick={() => navigate('/usuario')}
            >
              ↩ Volver
            </button>
          </div>
                </div>
            </main>
        </div>
    );
};

export default CarritoCompra;