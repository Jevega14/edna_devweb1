import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/PedidosUsuario.css';

// Definimos una interfaz para la estructura de un pedido que viene del backend
interface Pedido {
    id: number;
    precio: number;
    estado: string;
    // Añadimos las relaciones que esperamos recibir
    cliente: {
        nombre: string;
    };
    encargado: {
        nombre: string;
    };
    pedido_disenos: {
        cantidad: number;
        diseno: {
            nombre: string;
        }
    }[];
}

function PedidosUsuario() {
    // Estados para almacenar los pedidos, el estado de carga y los errores
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    // useEffect se ejecuta automáticamente después de que el componente se renderiza
    useEffect(() => {
        const fetchPedidos = async () => {
            setIsLoading(true);
            setError(null);
            try {
                // Hacemos la petición GET a nuestro endpoint del backend
                const response = await fetch('http://localhost:4000/api/pedidos');

                if (!response.ok) {
                    throw new Error('Error al obtener los pedidos del servidor.');
                }

                const data: Pedido[] = await response.json();

                // NOTA: Por ahora, esto trae TODOS los pedidos. Más adelante lo filtraremos por usuario.
                setPedidos(data);

            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPedidos();
    }, []); // El array vacío [] significa que este efecto se ejecuta solo una vez

    const cancelarPedido = (id: number) => {
        // Lógica para cancelar un pedido (se implementaría en el futuro)
        alert(`Funcionalidad para cancelar pedido ${id} no implementada.`);
    };

    if (isLoading) {
        return <div style={{ textAlign: 'center', marginTop: '5rem', fontSize: '1.5rem' }}>Cargando pedidos...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '5rem', fontSize: '1.5rem', color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div className="pedidos-container">
            <h2>Mis pedidos</h2>
            <table className="edna-table">
                <thead>
                <tr>
                    <th>Número</th>
                    <th>Valor total</th>
                    <th>Detalles</th>
                    <th>Diseñador a cargo</th>
                    <th>Estado</th>
                    <th>Acción</th>
                </tr>
                </thead>
                <tbody>
                {pedidos.map(p => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td className="edna-table-valor">${p.precio}</td>
                        {/* Combinamos los detalles de los diseños en un solo string */}
                        <td>{p.pedido_disenos.map(pd => `${pd.cantidad}x ${pd.diseno.nombre}`).join(', ')}</td>
                        <td>{p.encargado.nombre}</td>
                        <td>
                            <span className="edna-status">{p.estado}</span>
                        </td>
                        <td>
                            {p.estado !== 'Cancelado' && p.estado !== 'Entregado' ? (
                                <button className="edna-btn" onClick={() => cancelarPedido(p.id)}>Cancelar</button>
                            ) : (
                                <span style={{ color: '#aaa' }}>-</span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="back-container">
                <button className="edna-btn" onClick={() => navigate('/usuario')}>
                    ↩ Volver
                </button>
            </div>
        </div>
    );
}

export default PedidosUsuario;
