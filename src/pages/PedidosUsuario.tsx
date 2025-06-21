import React, { useState } from 'react';
import '../styles.css';

const pedidosMock = [
  { id: 1, valor: 120000, detalles: 'Traje de vuelo', disenador: 'Ana Torres', estado: 'Pendiente' },
  { id: 2, valor: 95000, detalles: 'Blusa blindada', disenador: 'Carlos Ruiz', estado: 'En proceso' },
  { id: 3, valor: 150000, detalles: 'Capa inteligente', disenador: 'Ana Torres', estado: 'Entregado' },
];

function PedidosUsuario() {
  const [pedidos, setPedidos] = useState(pedidosMock);

  const cancelarPedido = (id: number) => {
    setPedidos(pedidos.map(p => p.id === id ? { ...p, estado: 'Cancelado' } : p));
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto' }}>
      <h2 style={{ color: '#7b2ff2', marginBottom: '1.5rem' }}>Mis Pedidos de Trajes para Superhéroes</h2>
      <table className="edna-table">
        <thead>
          <tr>
            <th>Número</th>
            <th>Valor total</th>
            <th>Detalles</th>
            <th>Diseñador a cargo</th>
            <th>Estado</th>
            <th>Cancelar pedido</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>${p.valor.toLocaleString()}</td>
              <td>{p.detalles}</td>
              <td>{p.disenador}</td>
              <td><span className="edna-status">{p.estado}</span></td>
              <td>
                {p.estado !== 'Cancelado' && p.estado !== 'Entregado' ? (
                  <button className="edna-cancel-btn" onClick={() => cancelarPedido(p.id)}>Cancelar</button>
                ) : (
                  <span style={{ color: '#aaa' }}>-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PedidosUsuario;
