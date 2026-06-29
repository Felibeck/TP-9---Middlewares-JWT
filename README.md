# WatchGram - Proyecto Full Stack

Aplicación web social temática de relojes de lujo con arquitectura separada en frontend y backend.

## Estructura del Proyecto

```
├── Watchgram-backend/        # API REST con Node.js, Express y PostgreSQL
│   ├── src/
│   │   ├── config/          # Configuración de BD
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── middlewares/     # JWT y validación
│   │   ├── routes/          # Endpoints
│   │   ├── services/        # Queries SQL
│   │   └── app.js           # Servidor Express
│   ├── database/            # Scripts SQL
│   ├── package.json
│   ├── .env                 # Variables de entorno
│   └── README.md
│
└── Watchgram-frontend/       # React + TypeScript + Vite
    ├── src/
    │   ├── components/      # Componentes reutilizables
    │   ├── pages/           # Páginas principales
    │   ├── services/        # Llamadas a API
    │   ├── types/           # TypeScript types
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    ├── vite.config.ts
    └── README.md
```

## Instalación

### Backend

```bash
cd Watchgram-backend
npm install
```

Configura el `.env`:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=root
DB_NAME=watchgram-bd
JWT_SECRET=perrito-milanesa-alfombra-caniche-pollo-sommier
JWT_EXPIRE=2h
NODE_ENV=development
```

Inicia el servidor:
```bash
npm start
```

### Frontend

```bash
cd Watchgram-frontend
npm install
npm run dev
```

## Endpoints Disponibles

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Publicaciones
- `GET /api/publicaciones` - Obtener feed (público)
- `POST /api/publicaciones` - Crear publicación (requiere JWT)

### Usuarios
- `GET /api/usuarios/perfil` - Obtener perfil (requiere JWT)
- `PUT /api/usuarios/perfil` - Actualizar perfil (requiere JWT)

## Tecnologías

**Backend:**
- Node.js + Express
- PostgreSQL
- JWT para autenticación
- bcryptjs para hashing de contraseñas

**Frontend:**
- React 18 + TypeScript
- Vite
- React Router
- Axios para HTTP

## Desarrollo

Para desarrollar ambas partes simultáneamente:

**Terminal 1 (Backend):**
```bash
cd Watchgram-backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd Watchgram-frontend
npm run dev
```

Frontend correrá en `http://localhost:5173`  
Backend correrá en `http://localhost:3000`
