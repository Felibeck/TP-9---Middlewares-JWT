import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { validarCreacionPublicacion } from '../middlewares/validacion.js';
import { obtenerPublicaciones, crearPublicacion } from '../controllers/postsController.js';

const router = express.Router();

router.get('/', obtenerPublicaciones);
router.post('/', authMiddleware, validarCreacionPublicacion, crearPublicacion);

export default router;
