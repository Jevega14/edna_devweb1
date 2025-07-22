import React,  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/RealizacionPedidoUser.css';

const RealizacionPedidoUser: React.FC = () => {

    
    const [direccion, setDireccion] = useState('');
    const [cliente, setCliente] = useState('');
    const [prendasPedido, setPrendasPedido] = useState<{ id: number; nombre: string; cantidad: number }[]>([]);

    useEffect(() => {
    const stored = localStorage.getItem('prendasPedido');
    if (stored) {
        setPrendasPedido(JSON.parse(stored));
    }
    }, []);


    const aumentarCantidad = (index: number) => {
    setPrendasPedido(prev =>
        prev.map((item, i) =>
        i === index
            ? { ...item, cantidad: typeof item.cantidad === 'number' ? item.cantidad + 1 : 1 }
            : item
        )
    );
    };

    const disminuirCantidad = (index: number) => {
    setPrendasPedido(prev =>
        prev.map((item, i) =>
        i === index
            ? { ...item, cantidad: typeof item.cantidad === 'number' && item.cantidad > 1 ? item.cantidad - 1 : 1 }
            : item
        )
    );
    };

    const pedido = {
        precio: prendasPedido.reduce((acc, item) => acc + item.cantidad * 100, 0),
        fechaEstimadaEntrega: new Date().toISOString(),
        direccionEntrega: direccion,
        estado: 'Pendiente',
        cliente_id: 1, // ← debe existir en la tabla Usuario
        encargado_id: 1, // ← debe existir en la tabla Administrador
        detalles: prendasPedido.map(item => ({
            diseno_id: item.id, // ← debe existir en la tabla Diseño
            cantidad: item.cantidad
        }))
    };

    

    const navigate = useNavigate();

    const handleHacerPedido = async () => {
    if (!direccion || !cliente || prendasPedido.length === 0) {
        alert('Completa todos los campos y selecciona al menos una prenda.');
        return;
    }

    const pedido = {
        id: Date.now(), // id único simulado
        precio: prendasPedido.reduce((acc, item) => acc + item.cantidad * 100, 0),
        fechaEstimadaEntrega: new Date().toISOString(),
        direccionEntrega: direccion,
        estado: 'Pendiente',
        cliente: { nombre: cliente },
        encargado: { nombre: 'Diseñador 1' },
        pedido_disenos: prendasPedido.map(item => ({
        cantidad: item.cantidad,
        diseno: { nombre: item.nombre }
        }))
    };

    // Guardar en localStorage
    const pedidosGuardados = localStorage.getItem('pedidosUsuario');
    const pedidosArray = pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
    pedidosArray.push(pedido);
    localStorage.setItem('pedidosUsuario', JSON.stringify(pedidosArray));

    alert('Pedido realizado con éxito');
    navigate('/pedidos-usuario');
    };
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
                            <input
                                type="text"
                                id="delivery-address"
                                className="text-input"
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                />
                        </div>
                        <div className="input-group">
                            <label htmlFor="client-name">Nombre de cliente</label>
                            <input
                                type="text"
                                id="client-name"
                                className="text-input"
                                value={cliente}
                                onChange={(e) => setCliente(e.target.value)}
                                />
                        </div>
                        <div className="input-group">
                            <label htmlFor="additional-data">Datos adicionales</label>
                            <textarea id="additional-data" className="textarea-input"></textarea>
                        </div>
                    </div>
                    <div className="order-summary-card" style={{ maxWidth: 520, minWidth: 340, flex: 1 }}>
                        <h3>Resumen del pedido</h3>
                       <div className="summary-items">
                            {prendasPedido.map((prenda, index) => (
                                <div key={index} className="summary-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span className="item-icon">
                                    {prenda?.nombre?.includes('boda') ? '👕' :
                                    prenda?.nombre?.includes('azul') ? '👖' :
                                    prenda?.nombre?.includes('final') ? '👚' : '👗'}
                                </span>
                                <p>{prenda.nombre}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <button onClick={() => disminuirCantidad(index)} style={{ padding: '0.3rem 0.7rem' }}>➖</button>
                                    <span>{prenda.cantidad}</span>
                                    <button onClick={() => aumentarCantidad(index)} style={{ padding: '0.3rem 0.7rem' }}>➕</button>
                                </div>
                                </div>
                            ))}
                        </div>
                        <div className="summary-info">
                            <p><strong>Dirección de entrega:</strong></p>
                            <p className="summary-text">{direccion}</p>
                            <p><strong>Nombre del cliente:</strong></p>
                            <p className="summary-text">{cliente}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
                            <button className="edna-btn" onClick={handleHacerPedido}>
                            Hacer pedido ❯
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2.5rem 0 1.5rem 0' }}>
                <button className="edna-btn" style={{ fontSize: '1rem', padding: '0.5rem 1.5rem', minWidth: 0, width: 'auto', borderRadius: 8, background: '#fff', color: '#232323', border: '2px solid #cccccc', boxShadow: 'none' }} onClick={() => navigate('/Carritocompra')}>
                    ↩ Volver
                </button>
            </div>
        </div>
    );
};

export default RealizacionPedidoUser;