import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 950, margin: '2.5rem auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(35,35,35,0.10)', padding: '2.5rem 1.5rem', fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif' }}>
      <h2 style={{ color: '#232323', fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontWeight: 800, fontSize: '2.1rem', textAlign: 'center', letterSpacing: 1, marginBottom: '2rem' }}>
        Mis pedidos
      </h2>
      <table className="edna-table" style={{ fontFamily: 'Montserrat, Segoe UI, Arial, sans-serif', fontSize: '1.05rem', width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
        <thead>
          <tr>
            <th style={{ fontWeight: 700, textAlign: 'center', padding: '0.9rem 0.5rem' }}>Número</th>
            <th style={{ fontWeight: 700, textAlign: 'center', padding: '0.9rem 0.5rem' }}>Valor total</th>
            <th style={{ fontWeight: 700, textAlign: 'center', padding: '0.9rem 0.5rem' }}>Detalles</th>
            <th style={{ fontWeight: 700, textAlign: 'center', padding: '0.9rem 0.5rem' }}>Diseñador a cargo</th>
            <th style={{ fontWeight: 700, textAlign: 'center', padding: '0.9rem 0.5rem' }}>Estado</th>
            <th style={{ fontWeight: 700, textAlign: 'center', padding: '0.9rem 0.5rem' }}>Cancelar pedido</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.id} style={{ verticalAlign: 'middle', textAlign: 'center' }}>
              <td>{p.id}</td>
              <td style={{ fontWeight: 600 }}>${p.valor.toLocaleString()}</td>
              <td>{p.detalles}</td>
              <td>{p.disenador}</td>
              <td>
                <span className="edna-status" style={{ borderRadius: 8, padding: '0.3rem 1.1rem', fontWeight: 700, background: '#f5f5f5', color: '#7b2ff2', fontSize: '1rem', border: '1.5px solid #e0e0e0', display: 'inline-block', minWidth: 90 }}>{p.estado}</span>
              </td>
              <td>
                {p.estado !== 'Cancelado' && p.estado !== 'Entregado' ? (
                  <button className="edna-btn" style={{ minWidth: 120, padding: '0.5rem 1.2rem', fontSize: '1rem', borderRadius: 8, margin: '0 auto', display: 'block' }} onClick={() => cancelarPedido(p.id)}>Cancelar</button>
                ) : (
                  <span style={{ color: '#aaa' }}>-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', margin: '2.5rem 0 1.5rem 0' }}>
                <button className="edna-btn" style={{ fontSize: '1rem', padding: '0.5rem 1.5rem', minWidth: 0, width: 'auto', borderRadius: 8, background: '#fff', color: '#232323', border: '2px solid #cccccc', boxShadow: 'none' }} onClick={() => navigate('/usuario')}>
                    ↩ Volver
                </button>
            </div>
    </div>
    
  );
}

export default PedidosUsuario;
