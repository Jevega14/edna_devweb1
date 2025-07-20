import { Router } from 'express';
import MaterialController from '../controllers/MaterialController';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Ruta para que el admin logueado obtenga SUS materiales
router.get('/mis-materiales', [authMiddleware], MaterialController.getByAdmin);

// Rutas públicas
router.get('/', MaterialController.getAll);
router.get('/:id', MaterialController.getById);

// Rutas protegidas
router.post('/', [authMiddleware], MaterialController.create);
router.put('/:id', [authMiddleware], MaterialController.update);
router.delete('/:id', [authMiddleware], MaterialController.delete);

export default router;
