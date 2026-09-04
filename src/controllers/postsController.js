import * as publicacionesService from '../services/publicacionesService.js';

export async function obtenerPublicaciones(req, res) {
  /*
    #swagger.tags = ['Publicaciones']
    #swagger.summary = 'Obtener el feed global de publicaciones'
    #swagger.description = 'Devuelve todas las publicaciones junto con datos del autor. No requiere autenticación.'
    #swagger.responses[200] = {
      description: 'Listado de publicaciones',
      content: {
        "application/json": {
          schema: { type: 'array', items: { $ref: '#/components/schemas/Publicacion' } }
        }
      }
    }
  */
  try {
    const publicaciones = await publicacionesService.obtenerTodasLasPublicaciones();
    return res.status(200).json(publicaciones);
  } catch (error) {
    console.error('Error al obtener publicaciones:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export async function crearPublicacion(req, res) {
  /*
    #swagger.tags = ['Publicaciones']
    #swagger.summary = 'Crear una nueva publicación'
    #swagger.description = 'Crea una publicación asociada al usuario autenticado.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: { $ref: '#/components/schemas/CrearPublicacionRequest' }
        }
      }
    }
    #swagger.responses[201] = {
      description: 'Publicación creada exitosamente',
      content: {
        "application/json": {
          schema: {
            message: 'Publicación creada exitosamente',
            publicacion: { $ref: '#/components/schemas/Publicacion' }
          }
        }
      }
    }
    #swagger.responses[400] = {
      description: 'url_imagen no proporcionada o inválida',
      content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
    }
    #swagger.responses[401] = {
      description: 'Token no proporcionado, inválido o expirado',
      content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
    }
  */
  try {
    const userId = req.user.userId;
    const { url_imagen, descripcion } = req.body;

    const nuevaPublicacion = await publicacionesService.crearPublicacion(
      userId,
      url_imagen,
      descripcion || ''
    );

    return res.status(201).json({
      message: 'Publicación creada exitosamente',
      publicacion: nuevaPublicacion
    });
  } catch (error) {
    console.error('Error al crear publicación:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export async function darLikePublicacion(req, res) {
  /*
    #swagger.tags = ['Publicaciones']
    #swagger.summary = 'Dar like a una publicación'
    #swagger.description = 'Incrementa el contador de likes de la publicación indicada.'
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.parameters['id'] = { description: 'ID de la publicación', required: true, type: 'integer' }
    #swagger.responses[200] = {
      description: 'Like agregado correctamente',
      content: {
        "application/json": {
          schema: {
            message: 'Like agregado correctamente',
            publicacion: { $ref: '#/components/schemas/Publicacion' }
          }
        }
      }
    }
    #swagger.responses[401] = {
      description: 'Token no proporcionado, inválido o expirado',
      content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
    }
    #swagger.responses[404] = {
      description: 'Publicación no encontrada',
      content: { "application/json": { schema: { $ref: '#/components/schemas/ErrorResponse' } } }
    }
  */
  try {
    const { id } = req.params;
    const publicacionActualizada = await publicacionesService.darLikePublicacion(id);

    if (!publicacionActualizada) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    return res.status(200).json({
      message: 'Like agregado correctamente',
      publicacion: publicacionActualizada
    });
  } catch (error) {
    console.error('Error al dar like a la publicación:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
