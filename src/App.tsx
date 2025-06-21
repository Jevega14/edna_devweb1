import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Agregar demás páginas aquí
import InicioSesion from './pages/InicioSesion';
import PagPrinDiseñador from './pages/PagPrinDiseñador';
import PagPrinUsuario from './pages/PagPrinUsuario';
import EditarPerfil from './pages/EditarPerfil';
import EditarPerfilDiseñador from './pages/EditarPerfilDiseñador';
import Register from './pages/Register';
import CrearDiseños from './pages/CrearDiseños';
import DiseñosGuardados from './pages/DiseñosGuardados';
import Home from './pages/Home';
import RealizacionPedidoUser from './pages/RealizacionPedidoUser';
import CarritoCompra from './pages/CarritoCompra';
import GestionInventario from './pages/GestionInventario';
import FormularioDiseno from './pages/FormularioDiseno';
import NuevoMaterial from './pages/NuevoMaterial';

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
        <Link to="/creardiseño" style={{ marginRight: '1rem' }}>Crear Diseños</Link>
        <Link to="/diseñosguardados" style={{ marginRight: '1rem' }}>Diseños Guardados</Link>
        <Link to="/perfil">Editar perfil</Link>
        <Link to="/RealizacionPedidoUser" style={{ marginLeft: '1rem' }}>Realizar pedido usuario</Link>
        <Link to="/CarritoCompra" style={{ marginLeft: '1rem' }}>Carrito de compra</Link>
        <Link to="/inventario" style={{ marginLeft: '1rem' }}>Gestion inventario diseñador</Link>
        <Link to="/nuevo-diseno" style={{ marginLeft: '1rem' }}>Creacion nuevo diseño</Link>
        <Link to="/nuevo-material" style={{ marginLeft: '1rem' }}>Nuevo material</Link>
        <Link to="/CarritoCompra" style={{ marginLeft: '1rem' }}> 🛒 </Link>

      </nav>

      {/* Definición de rutas */}
      <Routes>
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diseñador" element={<PagPrinDiseñador />} />
        <Route path="/usuario" element={<PagPrinUsuario />} />
        <Route path="/perfil" element={<EditarPerfil />} />
        <Route path="/perfil-diseñador" element={<EditarPerfilDiseñador />} />
        <Route path="/creardiseño" element={<CrearDiseños/>} />
        <Route path="/diseñosguardados" element={<DiseñosGuardados />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/RealizacionPedidoUser" element={<RealizacionPedidoUser />} />
        <Route path="/CarritoCompra" element={<CarritoCompra />} />
        <Route path="/inventario" element={<GestionInventario />} />
        <Route path="/nuevo-diseno" element={<FormularioDiseno />} />
        <Route path="/nuevo-material" element={<NuevoMaterial />} />

        {/* Ruta por defecto */}
      </Routes>
    </Router>
  );
};

export default App;
