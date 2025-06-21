import React from 'react';
import './RealizacionPedidoUser.css';

const RealizacionPedidoUser: React.FC = () => {
    return (
        <div className="pedido-container">
            <header className="pedido-header">
                <h1>EdnaModa</h1>
                <div className="user-info">
                    <span>👤 Usuario</span>
                    <span>👤 Perfil</span>
                </div>
            </header>

            <main className="pedido-main">
                <div className="order-title">
                    <span className="lock-icon">🔒</span>
                    <h2>Realiza tu pedido</h2>
                </div>

                <div className="order-details-summary">
                    <div className="order-details-card">
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

                    <div className="order-summary-card">
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
                        <button className="make-order-button" onClick={() => alert('Hacer pedido')}>
                            Hacer pedido ❯
                        </button>
                    </div>
                </div>
            </main>

            <footer className="pedido-footer">
                <button className="back-button" onClick={() => alert('Volver')}>
                    ↩️ Volver
                </button>
            </footer>
        </div>
    );
};

export default RealizacionPedidoUser;