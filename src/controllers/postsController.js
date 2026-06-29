import * as publicacionesService from '../services/publicacionesService.js';

export async function obtenerPublicaciones(req, res) {
  try {
    const publicaciones = await publicacionesService.obtenerTodasLasPublicaciones();
    return res.status(200).json(publicaciones);
  } catch (error) {
    console.error('Error al obtener publicaciones:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

export async function crearPublicacion(req, res) {
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
