import * as usuariosService from '../services/usuariosService.js';

export async function obtenerPerfil(req, res) {
  /*
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Obtener el perfil del usuario autenticado'
    #swagger.description = 'Devuelve los datos del usuario autenticado junto con sus publicaciones.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.responses[200] = {
      description: 'Perfil del usuario',
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/Perfil' }
        }
      }
    }
    #swagger.responses[401] = {
      description: 'Token no proporcionado, inválido o expirado',
      content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
    }
    #swagger.responses[404] = {
      description: 'Usuario no encontrado',
      content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
    }
  */
  try {
    const userId = req.user.userId;

    const perfil = await usuariosService.obtenerPerfilConPublicaciones(userId);

    if (!perfil) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    return res.status(200).json(perfil);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export async function actualizarPerfil(req, res) {
  /*
    #swagger.tags = ['Usuarios']
    #swagger.summary = 'Actualizar el perfil del usuario autenticado'
    #swagger.description = 'Actualiza nombre completo, biografía y/o foto de perfil del usuario autenticado. Todos los campos son opcionales.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/ActualizarPerfilRequest' }
        }
      }
    }
    #swagger.responses[200] = {
      description: 'Perfil actualizado exitosamente',
      content: {
        "application/json": {
          schema: {
            message: 'Perfil actualizado exitosamente',
            user: { $ref: '#/components/schemas/Usuario' }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'Datos de actualización inválidos',
      content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
    }
    #swagger.responses[401] = {
      description: 'Token no proporcionado, inválido o expirado',
      content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
    }
    #swagger.responses[404] = {
      description: 'Usuario no encontrado',
      content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
    }
  */
  try {
    const userId = req.user.userId;
    const { nombre_completo, biografia, foto_perfil } = req.body;

    const usuarioActual = await usuariosService.obtenerUsuarioPorId(userId);
    if (!usuarioActual) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const perfilActualizado = await usuariosService.actualizarPerfilUsuario(
      userId,
      nombre_completo || usuarioActual.nombre_completo,
      biografia || usuarioActual.biografia,
      foto_perfil || usuarioActual.foto_perfil
    );

    return res.status(200).json({
      message: 'Perfil actualizado exitosamente',
      user: perfilActualizado
    });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
