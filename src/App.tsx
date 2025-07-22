import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioSesion from './pages/InicioSesion';
import PagPrinDiseñador from './pages/PagPrinDiseñador';
import PagPrinUsuario from './pages/PagPrinUsuario';
import EditarPerfil from './pages/EditarPerfil';
import Register from './pages/Register';
import CrearDiseños from './pages/CrearDiseños';
import DiseñosGuardados from './pages/DiseñosGuardados';
import Home from './pages/Home';
import RealizacionPedidoUser from './pages/RealizacionPedidoUser';
import CarritoCompra from './pages/CarritoCompra';
import GestionInventario from './pages/GestionInventario';
import FormularioDiseno from './pages/FormularioDiseno';
import NuevoMaterial from './pages/NuevoMaterial';
import PedidosDisenador from './pages/PedidosDisenador';
import PedidosUsuario from './pages/PedidosUsuario';
import Header from './components/Header';
import CatalogoPrendas from './pages/CatalogoPrendas';
import EditarMaterial from './pages/EditarMaterial';
import NuevoDisenoAdmin from './pages/NuevoDisenoAdmin';
import NuevaPrenda from './pages/NuevaPrenda';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<InicioSesion />} />
        <Route path="/register" element={<Register />} />
        <Route path="/diseñador" element={<PagPrinDiseñador />} />
        <Route path="/usuario" element={<PagPrinUsuario />} />
        <Route path="/perfil" element={<EditarPerfil />} />
        <Route path="/perfil-diseñador" element={<EditarPerfil />} />
        <Route path="/creardiseño" element={<CrearDiseños/>} />
        <Route path="/diseñosguardados" element={<DiseñosGuardados />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/RealizacionPedidoUser" element={<RealizacionPedidoUser />} />
        <Route path="/CarritoCompra" element={<CarritoCompra />} />
        <Route path="/inventario" element={<GestionInventario />} />
        <Route path="/nuevo-diseno" element={<FormularioDiseno />} />
        <Route path="/nuevo-material" element={<NuevoMaterial />} />
        <Route path="/pedidos-disenador" element={<PedidosDisenador />} />
        <Route path="/pedidos-usuario" element={<PedidosUsuario />} />
        <Route path="/catalogo" element={<CatalogoPrendas />} />
        <Route path="/editar-material/:id" element={<EditarMaterial />} />
        <Route path="/nuevo-diseno-admin" element={<NuevoDisenoAdmin />} />
        <Route path="/nueva-prenda" element={<NuevaPrenda />} />
      </Routes>
    </Router>
  );
};

export default App;
