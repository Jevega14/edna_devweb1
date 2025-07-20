import { Router } from 'express';
import UserController from '../controllers/UserController';
// import { authMiddleware } from '../middleware/auth.middleware'; // Lo añadiremos después

const router = Router();

// Por ahora, las rutas están abiertas. Más tarde las protegeremos.
// Obtiene el perfil de un usuario por su ID
router.get('/:id', UserController.getProfile);

// Actualiza el perfil de un usuario por su ID
router.put('/:id', UserController.updateProfile);

export default router;
