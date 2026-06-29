"# WatchGram Backend - API REST con Node.js, Express y PostgreSQL

Backend robusto y seguro para WatchGram, una red social temática de fotografía de gatos de lujo. Este servidor implementa autenticación JWT, protección de endpoints sensibles y una arquitectura escalable basada en capas.

## Características

✓ **Autenticación con JWT** - Tokens seguros con expiración configurable  
✓ **Hash de contraseñas** - Encriptación con bcryptjs  
✓ **Arquitectura por capas** - Separación clara de responsabilidades  
✓ **Validación de datos** - Middlewares de validación en todos los endpoints  
✓ **Base de datos PostgreSQL** - Relaciones one-to-many entre usuarios y publicaciones  
✓ **Manejo robusto de errores** - Respuestas HTTP consistentes  

## Estructura del Proyecto

```
src/
├── config/
│   └── db.js                   # Pool de conexión PostgreSQL
├── controllers/
│   ├── authController.js       # Lógica de registro y login
│   ├── postsController.js      # Lógica de publicaciones
│   └── usersController.js      # Lógica de perfil de usuario
├── middlewares/
│   ├── auth.js                 # Verificación de JWT y generación de tokens
│   └── validacion.js           # Validación de esquemas de entrada
├── routes/
│   ├── auth.js                 # Rutas de autenticación
│   ├── posts.js                # Rutas de publicaciones
│   └── users.js                # Rutas de usuarios
├── services/
│   ├── usuariosService.js      # Queries para tabla usuarios
│   └── publicacionesService.js # Queries para tabla publicaciones
├── app.js                      # Configuración de Express
└── server.js                   # Punto de entrada
```

## Instalación

### 1. Clonar y dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=watchgram
JWT_SECRET=tu-clave-secreta-super-segura-cambia-esto-en-produccion
JWT_EXPIRE=2h
NODE_ENV=development
```

### 3. Base de datos

Ejecutar el script SQL para crear las tablas:

```bash
psql -U postgres -d watchgram -f database/dump-watchgram-bd-202606261150.sql
```

## Ejecución

**Desarrollo** (con reload automático):
```bash
npm run dev
```

**Producción**:
```bash
npm start
```

## Endpoints de la API

### Autenticación (Públicas)

#### `POST /api/auth/register`
Registrar un nuevo usuario.

**Request:**
```json
{
  "nombre_usuario": "gato_programador",
  "nombre_completo": "Gato Programador",
  "email": "gato@example.com",
  "password": "segura123",
  "foto_perfil": "https://ejemplo.com/foto.jpg" // opcional
}
```

**Response (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 1,
    "nombre_usuario": "gato_programador",
    "nombre_completo": "Gato Programador",
    "email": "gato@example.com",
    "foto_perfil": "https://ejemplo.com/foto.jpg"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### `POST /api/auth/login`
Iniciar sesión.

**Request:**
```json
{
  "email": "gato@example.com",
  "password": "segura123"
}
```

**Response (200):**
```json
{
  "message": "Login exitoso",
  "user": {
    "id": 1,
    "nombre_usuario": "gato_programador",
    "nombre_completo": "Gato Programador",
    "email": "gato@example.com",
    "foto_perfil": "https://ejemplo.com/foto.jpg"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Publicaciones

#### `GET /api/publicaciones`
Obtener todas las publicaciones del feed global.

**Response (200):**
```json
[
  {
    "id": 1,
    "usuario_id": 1,
    "url_imagen": "https://ejemplo.com/gato.jpg",
    "descripcion": "Mi gato favorito",
    "likes": 42,
    "fecha_creacion": "2026-06-29T10:30:00Z",
    "nombre_usuario": "gato_programador",
    "foto_perfil": "https://ejemplo.com/foto.jpg"
  }
]
```

#### `POST /api/publicaciones`
Crear una nueva publicación. **Requiere JWT**.

**Header:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "url_imagen": "https://ejemplo.com/gato.jpg",
  "descripcion": "Mi gato favorito" // opcional
}
```

**Response (201):**
```json
{
  "message": "Publicación creada exitosamente",
  "publicacion": {
    "id": 1,
    "usuario_id": 1,
    "url_imagen": "https://ejemplo.com/gato.jpg",
    "descripcion": "Mi gato favorito",
    "likes": 0,
    "fecha_creacion": "2026-06-29T10:30:00Z"
  }
}
```

### Usuarios (Protegidas)

#### `GET /api/usuarios/perfil`
Obtener el perfil del usuario autenticado con sus publicaciones. **Requiere JWT**.

**Header:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": 1,
  "nombre_usuario": "gato_programador",
  "nombre_completo": "Gato Programador",
  "email": "gato@example.com",
  "foto_perfil": "https://ejemplo.com/foto.jpg",
  "biografia": "Amante de los gatos y la programación",
  "publicaciones": [
    {
      "id": 1,
      "usuario_id": 1,
      "url_imagen": "https://ejemplo.com/gato.jpg",
      "descripcion": "Mi gato favorito",
      "likes": 42,
      "fecha_creacion": "2026-06-29T10:30:00Z"
    }
  ]
}
```

#### `PUT /api/usuarios/perfil`
Actualizar el perfil del usuario autenticado. **Requiere JWT**.

**Header:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "nombre_completo": "Gato Programador Avanzado", // opcional
  "biografia": "Amante de los gatos y la programación", // opcional
  "foto_perfil": "https://ejemplo.com/nueva-foto.jpg" // opcional
}
```

**Response (200):**
```json
{
  "message": "Perfil actualizado exitosamente",
  "user": {
    "id": 1,
    "nombre_usuario": "gato_programador",
    "nombre_completo": "Gato Programador Avanzado",
    "email": "gato@example.com",
    "foto_perfil": "https://ejemplo.com/nueva-foto.jpg",
    "biografia": "Amante de los gatos y la programación"
  }
}
```

### Health Check

#### `GET /api/health`
Verificar que el servidor está funcionando.

**Response (200):**
```json
{
  "message": "Servidor funcionando correctamente"
}
```

## Modelo de Datos

### Tabla `usuarios`
```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    nombre_completo VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    foto_perfil VARCHAR(255),
    biografia VARCHAR(255)
);
```

### Tabla `publicaciones`
```sql
CREATE TABLE publicaciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL,
    url_imagen VARCHAR(255) NOT NULL,
    descripcion TEXT,
    likes INTEGER DEFAULT 0,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);
```

## Seguridad

- **JWT**: Tokens con firma y expiración automática
- **Contraseñas**: Hasheadas con bcryptjs (10 salt rounds)
- **Validación**: Esquemas de entrada validados en middlewares
- **Errores**: No exponen detalles internos de la BD
- **CORS**: Configurable según necesidad

## Manejo de Errores

Todos los errores siguen este formato:

```json
{
  "message": "Descripción del error"
}
```

### Códigos HTTP utilizados

| Código | Significado |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Entrada inválida |
| 401 | Unauthorized - Token inválido/ausente |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Email/username ya registrado |
| 500 | Internal Server Error - Error del servidor |

## Próximas Mejoras

- [ ] CORS completamente configurado
- [ ] Refresh tokens
- [ ] Rate limiting
- [ ] Logging más detallado
- [ ] Tests unitarios e integración
- [ ] Documentación Swagger/OpenAPI
- [ ] Paginación en listado de publicaciones
- [ ] Sistema de likes persistente por usuario
- [ ] Comentarios en publicaciones
- [ ] Sistema de notificaciones

## Autor

Felibeck - TP-9 Middlewares JWT" 
