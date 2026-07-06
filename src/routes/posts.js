import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { validarCreacionPublicacion } from '../middlewares/validacion.js';
import { obtenerPublicaciones, crearPublicacion, darLikePublicacion } from '../controllers/postsController.js';

const router = express.Router();

router.get('/', obtenerPublicaciones);
router.post('/', authMiddleware, validarCreacionPublicacion, crearPublicacion);
router.post('/:id/like', authMiddleware, darLikePublicacion);

export default router;
