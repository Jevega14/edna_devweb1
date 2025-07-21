import { Router } from 'express';
import PrendaController from '../controllers/PrendaController';
import { authMiddleware } from '../middleware/auth.middleware'; // <-- 1. IMPORTAMOS EL GUARDIA

const router = Router();

// --- Rutas Públicas (Cualquiera puede ver el catálogo) ---
router.get('/', PrendaController.getAll);
router.get('/:id', PrendaController.getById);

// --- Rutas Protegidas (Solo usuarios con token pueden acceder) ---
// Añadimos [authMiddleware] como un paso intermedio.
// Si el token no es válido, la petición nunca llegará al controlador.
router.post('/', [authMiddleware], PrendaController.create);
router.put('/:id', [authMiddleware], PrendaController.update);
router.delete('/:id', [authMiddleware], PrendaController.delete);

export default router;
