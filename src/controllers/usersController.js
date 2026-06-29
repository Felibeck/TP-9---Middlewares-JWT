import * as usuariosService from '../services/usuariosService.js';

export async function obtenerPerfil(req, res) {
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
