// src/routes/adminRoutes.ts
import { Router } from 'express';
import AdminController from '../controllers/AdminController';
// import { authMiddleware, isAdminMiddleware } from '../middleware/auth.middleware'; // Se añadirían después

const router = Router();

// Ruta de login para administradores
router.post('/login', AdminController.login);

// Rutas para gestionar administradores (en un futuro se protegerían)
router.get('/', AdminController.getAll);
router.post('/', AdminController.create);

export default router;