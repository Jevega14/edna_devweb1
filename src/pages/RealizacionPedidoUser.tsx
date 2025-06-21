import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RealizacionPedidoUser.css';

const RealizacionPedidoUser: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="pedido-container" style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', background: '#f5f5f5', minHeight: '100vh', position: 'relative' }}>
            <main className="pedido-main" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(35,35,35,0.10)', maxWidth: 1100, margin: '3.5rem auto 0 auto', padding: '2.5rem 1.5rem' }}>
                <div className="order-title" style={{ justifyContent: 'center' }}>
                    <span className="lock-icon">🔒</span>
                    <h2 style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#232323', margin: 0, letterSpacing: '1px' }}>Realiza tu pedido</h2>
                </div>
                <div className="order-details-summary" style={{ gap: '3.5rem' }}>
                    <div className="order-details-card" style={{ maxWidth: 520, minWidth: 340, flex: 1 }}>
                        <h3>Datos del pedido</h3>
                        <div className="input-group">
                            <label htmlFor="delivery-address">Dirección de entrega</label>
                            <input type="text" id="delivery-address" className="text-input" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="client-name">Nombre de cliente</label>
                            <input type="text" id="client-name" className="text-input" />
                        </div>
                        <div className="input-group">
                            <label htmlFor="additional-data">Datos adicionales</label>
                            <textarea id="additional-data" className="textarea-input"></textarea>
                        </div>
                    </div>
                    <div className="order-summary-card" style={{ maxWidth: 520, minWidth: 340, flex: 1 }}>
                        <h3>Resumen del pedido</h3>
                        <div className="summary-items">
                            <div className="summary-item">
                                <span className="item-icon">👕</span>
                                <p>Diseño Boda</p>
                            </div>
                            <div className="summary-item">
                                <span className="item-icon">👖</span>
                                <p>Diseño Azul</p>
                            </div>
                        </div>
                        <div className="summary-info">
                            <p><strong>Dirección de entrega:</strong></p>
                            <p className="summary-text">_ _ _ _ _ _ _ _</p>
                            <p><strong>Encargado del diseño:</strong></p>
                            <p className="summary-text">_ _ _ _ _ _ _ _</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                            <button className="edna-btn" style={{ fontWeight: 700, width: 'fit-content', fontSize: '1.08rem' }} onClick={() => alert('Hacer pedido')}>
                                Hacer pedido ❯
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2.5rem 0 1.5rem 0' }}>
                <button className="edna-btn" style={{ fontSize: '1rem', padding: '0.5rem 1.5rem', minWidth: 0, width: 'auto', borderRadius: 8, background: '#fff', color: '#232323', border: '2px solid #cccccc', boxShadow: 'none' }} onClick={() => navigate('/usuario')}>
                    ↩ Volver
                </button>
            </div>
        </div>
    );
};

export default RealizacionPedidoUser;