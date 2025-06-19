import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Agregar demás páginas aquí
import InicioSesion from './pages/InicioSesion';
import PagPrinDiseñador from './pages/PagPrinDiseñador';
import PagPrinUsuario from './pages/PagPrinUsuario';
import EditarPerfil from './pages/EditarPerfil';
import EditarPerfilDiseñador from './pages/EditarPerfilDiseñador';
import Register from './pages/Register';
import Home from './pages/Home';
import RealizacionPedidoUser from './pages/RealizacionPedidoUser';
import CarritoCompra from './pages/CarritoCompra';

const App: React.FC = () => {
  return (
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        {/* Enlaces para navegar */}
        <Link to="/Home" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/login" style={{ marginRight: '1rem' }}>Iniciar sesión</Link>
        <Link to="/register" style={{ marginRight: '1rem' }}>Registro</Link>
        <Link to="/diseñador" style={{ marginRight: '1rem' }}>Diseñador</Link>
        <Link to="/usuario" style={{ marginRight: '1rem' }}>Usuario</Link>
        <Link to="/perfil">Editar perfil</Link>
        <Link to="/carrito-compra" style={{ marginLeft: '1rem' }}>Carrito de compra</Link>
        <Link to="/realizar-pedido" style={{ marginLeft: '1rem' }}>Realizar pedido</Link>
      </nav>

      {/* Definición de rutas */}
      <Routes>
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diseñador" element={<PagPrinDiseñador />} />
        <Route path="/usuario" element={<PagPrinUsuario />} />
        <Route path="/perfil" element={<EditarPerfil />} />
        <Route path="/perfil-diseñador" element={<EditarPerfilDiseñador />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/realizar-pedido" element={<RealizacionPedidoUser />} />
        <Route path="/carrito-compra" element={<CarritoCompra />} />
        {/* Ruta por defecto */}
      </Routes>
    </Router>
  );
};

export default App;
