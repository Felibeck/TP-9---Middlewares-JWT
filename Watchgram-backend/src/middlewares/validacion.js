export function validarRegistro(req, res, next) {
  const { nombre_usuario, nombre_completo, email, password } = req.body;

  if (!nombre_usuario || !nombre_completo || !email || !password) {
    return res.status(400).json({
      message: 'Faltan campos requeridos: nombre_usuario, nombre_completo, email, password'
    });
  }

  if (typeof nombre_usuario !== 'string' || nombre_usuario.trim().length < 3) {
    return res.status(400).json({
      message: 'nombre_usuario debe tener al menos 3 caracteres'
    });
  }

  if (typeof nombre_completo !== 'string' || nombre_completo.trim().length < 3) {
    return res.status(400).json({
      message: 'nombre_completo debe tener al menos 3 caracteres'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Email inválido'
    });
  }

  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({
      message: 'password debe tener al menos 6 caracteres'
    });
  }

  next();
}

export function validarLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email y password son requeridos'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'Email inválido'
    });
  }

  next();
}

export function validarCreacionPublicacion(req, res, next) {
  const { url_imagen } = req.body;

  if (!url_imagen) {
    return res.status(400).json({
      message: 'url_imagen es requerida'
    });
  }

  if (typeof url_imagen !== 'string' || url_imagen.trim().length === 0) {
    return res.status(400).json({
      message: 'url_imagen debe ser una cadena válida'
    });
  }

  next();
}

export function validarActualizacionPerfil(req, res, next) {
  const { nombre_completo, biografia, foto_perfil } = req.body;

  if (nombre_completo && (typeof nombre_completo !== 'string' || nombre_completo.trim().length < 3)) {
    return res.status(400).json({
      message: 'nombre_completo debe tener al menos 3 caracteres'
    });
  }

  if (biografia && typeof biografia !== 'string') {
    return res.status(400).json({
      message: 'biografia debe ser una cadena de texto'
    });
  }

  if (foto_perfil && typeof foto_perfil !== 'string') {
    return res.status(400).json({
      message: 'foto_perfil debe ser una cadena de texto'
    });
  }

  next();
}
