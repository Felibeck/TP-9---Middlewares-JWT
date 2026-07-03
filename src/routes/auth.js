import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validarRegistro, validarLogin } from '../middlewares/validacion.js';

const router = express.Router();

router.post('/register', validarRegistro, register);
router.post('/login', validarLogin, login);

export default router;
