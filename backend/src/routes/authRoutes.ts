// src/routes/authRoutes.ts
import { Router } from 'express';
import AuthController from '../controllers/AuthController';

const router = Router();

// Ruta para registrar un nuevo usuario
router.post('/register', AuthController.register);

// Ruta para iniciar sesión
router.post('/login', AuthController.login);

export default router;