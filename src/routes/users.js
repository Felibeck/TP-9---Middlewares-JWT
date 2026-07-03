import express from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import { validarActualizacionPerfil } from '../middlewares/validacion.js';
import { obtenerPerfil, actualizarPerfil } from '../controllers/usersController.js';

const router = express.Router();

router.get('/perfil', authMiddleware, obtenerPerfil);
router.put('/perfil', authMiddleware, validarActualizacionPerfil, actualizarPerfil);

export default router;
