// src/routes/pedidoRoutes.ts
import { Router } from 'express';
import PedidoController from '../controllers/PedidoController';

const router = Router();

// Rutas para el CRUD de Pedidos
router.post('/', PedidoController.create);
router.get('/', PedidoController.getAll);
router.get('/:id', PedidoController.getById);
router.patch('/:id/estado', PedidoController.updateStatus); // Usamos PATCH para actualizaciones parciales

export default router;
