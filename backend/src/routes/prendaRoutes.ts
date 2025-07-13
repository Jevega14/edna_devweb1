// src/routes/prendaRoutes.ts
import { Router } from 'express';
import PrendaController from '../controllers/PrendaController';
// import { authMiddleware, isAdminMiddleware } from '../middleware/auth.middleware';

const router = Router();

// En un futuro, estas rutas deberían estar protegidas por middleware
router.post('/', PrendaController.create);
router.get('/', PrendaController.getAll);

export default router;