// src/routes/disenoRoutes.ts
import { Router } from 'express';
import DisenoController from '../controllers/DisenoController'; // <-- CAMBIO AQUÍ

const router = Router();

router.post('/', DisenoController.create);
router.get('/', DisenoController.getAll);

export default router;