import React, { useState } from 'react';
import '../styles.css';

const pedidosMock = [
  { id: 1, descripcion: 'Vestido largo para Superman', cliente: 'Clark Kent', valor: 120000, detalles: 'Color azul, talla M', estado: 'Pendiente' },
  { id: 2, descripcion: 'Blusa personalizada para Wonder Woman', cliente: 'Diana Prince', valor: 95000, detalles: 'Con bordado especial', estado: 'En proceso' },
  { id: 3, descripcion: 'Traje de gala para Batman', cliente: 'Bruce Wayne', valor: 150000, detalles: 'Incluye corbata', estado: 'Entregado' },
];

const estados = ['Pendiente', 'En proceso', 'Entregado', 'Cancelado'];

function PedidosDisenador() {
  const [pedidos, setPedidos] = useState(pedidosMock);

  const cambiarEstado = (id: number, nuevoEstado: string) => {
    setPedidos(pedidos.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
  };

  return (
    <div style={{ maxWidth: 950, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(123,47,242,0.08)', padding: '2rem 1rem' }}>
      <h2 style={{ color: '#7b2ff2', marginBottom: '1.5rem', textAlign: 'center', letterSpacing: 1 }}>Pedidos de Trajes - Diseñador</h2>
      <table className="edna-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Descripción</th>
            <th>Cliente</th>
            <th>Valor total</th>
            <th>Detalles</th>
            <th>Gestionar pedido</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p, idx) => (
            <tr key={p.id}>
              <td>{idx + 1}</td>
              <td>{p.descripcion}</td>
              <td>{p.cliente}</td>
              <td style={{ fontWeight: 600 }}>${p.valor.toLocaleString()}</td>
              <td>{p.detalles}</td>
              <td>
                <select className="edna-status" value={p.estado} onChange={e => cambiarEstado(p.id, e.target.value)}>
                  {estados.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PedidosDisenador;
