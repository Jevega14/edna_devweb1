import React, { useState } from 'react';
import '../styles.css';

const pedidosMock = [
  { id: 1, descripcion: 'Capa Superman', cliente: 'Clark Kent', valor: 120000, detalles: 'Color azul, talla M', estado: 'Pendiente' },
  { id: 2, descripcion: 'Blusa Wonder Woman', cliente: 'Diana Prince', valor: 95000, detalles: 'Con bordado especial', estado: 'En proceso' },
  { id: 3, descripcion: 'Traje de gala Batman', cliente: 'Bruce Wayne', valor: 150000, detalles: 'Incluye corbata', estado: 'Entregado' },
];

const estados = ['Pendiente', 'En proceso', 'Entregado', 'Cancelado'];

function PedidosDisenador() {
  const [pedidos, setPedidos] = useState(pedidosMock);

  const cambiarEstado = (id: number, nuevoEstado: string) => {
    setPedidos(pedidos.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p));
  };

  return (
    <div style={{ maxWidth: 950, margin: '2.5rem auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(35,35,35,0.10)', padding: '2.5rem 1.5rem', fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif' }}>
      <h2 style={{ color: '#232323', fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontWeight: 800, fontSize: '2.1rem', textAlign: 'center', letterSpacing: 1, marginBottom: '2rem' }}>
        Pedidos de Trajes
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table className="edna-table" style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontSize: '1.08rem', width: '100%', borderCollapse: 'separate', borderSpacing: 0, background: '#fff', boxShadow: '0 2px 12px rgba(35,35,35,0.07)', borderRadius: 14 }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ fontWeight: 800, textAlign: 'center', padding: '1.1rem 0.7rem', fontSize: '1.08rem', color: '#232323', borderTopLeftRadius: 14 }}>Número</th>
              <th style={{ fontWeight: 800, textAlign: 'center', padding: '1.1rem 0.7rem', fontSize: '1.08rem', color: '#232323' }}>Descripción</th>
              <th style={{ fontWeight: 800, textAlign: 'center', padding: '1.1rem 0.7rem', fontSize: '1.08rem', color: '#232323' }}>Cliente</th>
              <th style={{ fontWeight: 800, textAlign: 'center', padding: '1.1rem 0.7rem', fontSize: '1.08rem', color: '#232323' }}>Valor total</th>
              <th style={{ fontWeight: 800, textAlign: 'center', padding: '1.1rem 0.7rem', fontSize: '1.08rem', color: '#232323' }}>Detalles</th>
              <th style={{ fontWeight: 800, textAlign: 'center', padding: '1.1rem 0.7rem', fontSize: '1.08rem', color: '#232323', borderTopRightRadius: 14 }}>Gestionar pedido</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p, idx) => (
              <tr key={p.id} style={{ verticalAlign: 'middle', textAlign: 'center', borderBottom: '1.5px solid #e0e0e0', background: idx % 2 === 0 ? '#fff' : '#fafafa' }}>
                <td style={{ padding: '1rem 0.7rem' }}>{idx + 1}</td>
                <td style={{ padding: '1rem 0.7rem' }}>{p.descripcion}</td>
                <td style={{ padding: '1rem 0.7rem' }}>{p.cliente}</td>
                <td style={{ fontWeight: 600, padding: '1rem 0.7rem' }}>${p.valor.toLocaleString()}</td>
                <td style={{ padding: '1rem 0.7rem' }}>{p.detalles}</td>
                <td style={{ padding: '1rem 0.7rem' }}>
                  <select className="edna-status" style={{ borderRadius: 8, padding: '0.5rem 1.2rem', fontWeight: 700, background: '#f5f5f5', color: '#232323', fontSize: '1.05rem', border: '1.5px solid #e0e0e0', minWidth: 120, outline: 'none', boxShadow: '0 1px 4px #0001' }} value={p.estado} onChange={e => cambiarEstado(p.id, e.target.value)}>
                    {estados.map(e => <option key={e} value={e}>{e}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PedidosDisenador;
