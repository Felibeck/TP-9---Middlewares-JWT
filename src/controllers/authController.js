import bcrypt from 'bcryptjs';
import { generateToken } from '../middlewares/auth.js';
import * as usuariosService from '../services/usuariosService.js';

export async function register(req, res) {
  /*
    #swagger.tags = ['Autenticación']
    #swagger.summary = 'Registrar un nuevo usuario'
    #swagger.description = 'Crea una cuenta de usuario y devuelve un token JWT.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/RegistroRequest' }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Usuario registrado exitosamente',
      content: {
        "application/json": {
          schema: {
            message: 'Usuario registrado exitosamente',
            user: { $ref: '#/components/schemas/Usuario' },
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Faltan campos requeridos o son inválidos',
      content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
    }
    #swagger.responses[409] = {
      description: 'El email o el nombre de usuario ya están registrados',
      content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
    }
  */
  try {
    const { nombre_usuario, nombre_completo, email, password, foto_perfil } = req.body;

    const usuarioExistente = await usuariosService.obtenerUsuarioPorEmail(email);
    if (usuarioExistente) {
      return res.status(409).json({ message: 'El email ya está registrado' });
    }

    const usernameExistente = await usuariosService.obtenerUsuarioPorUsername(nombre_usuario);
    if (usernameExistente) {
      return res.status(409).json({ message: 'El nombre de usuario ya está registrado' });
    }

    const passwordEncriptada = await bcrypt.hash(password, 10);

    const nuevoUsuario = await usuariosService.crearUsuario(
      nombre_usuario,
      nombre_completo,
      email,
      passwordEncriptada,
      foto_perfil || null
    );

    const token = generateToken(nuevoUsuario.id, nuevoUsuario.nombre_usuario);

    return res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: nuevoUsuario,
      token
    });
  } catch (error) {
    console.error('Error en registro:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export async function login(req, res) {
  /*
    #swagger.tags = ['Autenticación']
    #swagger.summary = 'Iniciar sesión'
    #swagger.description = 'Valida las credenciales del usuario y devuelve un token JWT.'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/LoginRequest' }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Login exitoso',
      content: {
        "application/json": {
          schema: {
            message: 'Login exitoso',
            user: { $ref: '#/components/schemas/Usuario' },
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Email o password no proporcionados / email inválido',
      content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
    }
    #swagger.responses[401] = {
      description: 'Credenciales inválidas',
      content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
    }
  */
  try {
    const { email, password } = req.body;

    const usuario = await usuariosService.obtenerUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(usuario.id, usuario.nombre_usuario);

    const usuarioRespuesta = {
      id: usuario.id,
      nombre_usuario: usuario.nombre_usuario,
      nombre_completo: usuario.nombre_completo,
      email: usuario.email,
      foto_perfil: usuario.foto_perfil
    };

    return res.status(200).json({
      message: 'Login exitoso',
      user: usuarioRespuesta,
      token
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
