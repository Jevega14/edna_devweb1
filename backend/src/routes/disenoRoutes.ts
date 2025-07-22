import { Router } from 'express';
import DisenoController from '../controllers/DisenoController';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// --- Rutas para Diseños ---

// Ruta pública para que cualquiera vea el catálogo de diseños
router.get('/', DisenoController.getAll);

// Ruta protegida para que un administrador cree un nuevo diseño.
// Se requiere un token de administrador válido.
router.post('/', [authMiddleware], DisenoController.create);

// Ruta protegida para que un administrador vea solo sus diseños.
router.get('/mis-disenos', [authMiddleware], DisenoController.getByAdmin);

// Ruta protegida para que un administrador elimine uno de sus diseños.
router.delete('/:id', [authMiddleware], DisenoController.delete);

export default router;
