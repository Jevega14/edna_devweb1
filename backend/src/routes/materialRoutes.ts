import { Router } from 'express';
import MaterialController from '../controllers/MaterialController';

const router = Router();

router.post('/', MaterialController.create);
router.get('/', MaterialController.getAll);
router.get('/:id', MaterialController.getById);
router.put('/:id', MaterialController.update);
router.delete('/:id', MaterialController.delete);

export default router;