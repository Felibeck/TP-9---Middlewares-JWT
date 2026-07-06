import pool from '../config/db.js';

export async function obtenerTodasLasPublicaciones() {
  const result = await pool.query(
    `SELECT
      p.id,
      p.usuario_id,
      p.url_imagen,
      p.descripcion,
      p.likes,
      p.fecha_creacion,
      u.nombre_usuario,
      u.foto_perfil
     FROM publicaciones p
     JOIN usuarios u ON p.usuario_id = u.id
     ORDER BY p.fecha_creacion DESC`
  );
  return result.rows;
}

export async function obtenerPublicacionPorId(id) {
  const result = await pool.query(
    `SELECT
      p.id,
      p.usuario_id,
      p.url_imagen,
      p.descripcion,
      p.likes,
      p.fecha_creacion,
      u.nombre_usuario,
      u.foto_perfil
     FROM publicaciones p
     JOIN usuarios u ON p.usuario_id = u.id
     WHERE p.id = $1`,
    [id]
  );
  return result.rows[0];
}

export async function crearPublicacion(usuario_id, url_imagen, descripcion = '') {
  const result = await pool.query(
    `INSERT INTO publicaciones (usuario_id, url_imagen, descripcion, likes, fecha_creacion)
     VALUES ($1, $2, $3, 0, CURRENT_TIMESTAMP)
     RETURNING id, usuario_id, url_imagen, descripcion, likes, fecha_creacion`,
    [usuario_id, url_imagen, descripcion]
  );
  return result.rows[0];
}

export async function obtenerPublicacionesDelUsuario(usuario_id) {
  const result = await pool.query(
    `SELECT id, usuario_id, url_imagen, descripcion, likes, fecha_creacion
     FROM publicaciones
     WHERE usuario_id = $1
     ORDER BY fecha_creacion DESC`,
    [usuario_id]
  );
  return result.rows;
}

export async function darLikePublicacion(id) {
  const result = await pool.query(
    'UPDATE publicaciones SET likes = likes + 1 WHERE id = $1 RETURNING id, likes',
    [id]
  );
  return result.rows[0];
}

