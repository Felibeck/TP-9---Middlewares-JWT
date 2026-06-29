import pool from '../config/db.js';

export async function obtenerUsuarioPorEmail(email) {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE email = $1',
    [email]
  );
  return result.rows[0];
}

export async function obtenerUsuarioPorUsername(nombre_usuario) {
  const result = await pool.query(
    'SELECT * FROM usuarios WHERE nombre_usuario = $1',
    [nombre_usuario]
  );
  return result.rows[0];
}

export async function obtenerUsuarioPorId(id) {
  const result = await pool.query(
    'SELECT id, nombre_usuario, nombre_completo, email, foto_perfil, biografia FROM usuarios WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

export async function crearUsuario(nombre_usuario, nombre_completo, email, passwordEncriptada, foto_perfil = null) {
  const result = await pool.query(
    'INSERT INTO usuarios (nombre_usuario, nombre_completo, email, password, foto_perfil) VALUES ($1, $2, $3, $4, $5) RETURNING id, nombre_usuario, nombre_completo, email, foto_perfil',
    [nombre_usuario, nombre_completo, email, passwordEncriptada, foto_perfil]
  );
  return result.rows[0];
}

export async function actualizarPerfilUsuario(id, nombre_completo, biografia, foto_perfil) {
  const result = await pool.query(
    'UPDATE usuarios SET nombre_completo = $1, biografia = $2, foto_perfil = $3 WHERE id = $4 RETURNING id, nombre_usuario, nombre_completo, email, foto_perfil, biografia',
    [nombre_completo, biografia, foto_perfil, id]
  );
  return result.rows[0];
}

export async function obtenerPerfilConPublicaciones(usuario_id) {
  const usuarioResult = await pool.query(
    'SELECT id, nombre_usuario, nombre_completo, email, foto_perfil, biografia FROM usuarios WHERE id = $1',
    [usuario_id]
  );

  if (!usuarioResult.rows[0]) {
    return null;
  }

  const publicacionesResult = await pool.query(
    'SELECT id, url_imagen, descripcion, likes, fecha_creacion FROM publicaciones WHERE usuario_id = $1 ORDER BY fecha_creacion DESC',
    [usuario_id]
  );

  return {
    ...usuarioResult.rows[0],
    publicaciones: publicacionesResult.rows
  };
}
