// Genera swagger_output.json a partir de las rutas de la app.
// Ejecutar con: npm run swagger
import swaggerAutogenFactory from 'swagger-autogen';

const swaggerAutogen = swaggerAutogenFactory({ openapi: '3.0.0' });

const doc = {
  openapi: '3.0.0',
  info: {
    title: 'WatchGram Backend API',
    description:
      'API REST para WatchGram, una red social de fotografía de gatos. ' +
      'Incluye autenticación JWT, gestión de perfiles y publicaciones.',
    version: '1.0.0'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    },
    schemas: {
      Usuario: {
        id: 1,
        nombre_usuario: 'gato_programador',
        nombre_completo: 'Gato Programador',
        email: 'gato@example.com',
        foto_perfil: 'https://ejemplo.com/foto.jpg'
      },
      Perfil: {
        id: 1,
        nombre_usuario: 'gato_programador',
        nombre_completo: 'Gato Programador',
        email: 'gato@example.com',
        foto_perfil: 'https://ejemplo.com/foto.jpg',
        biografia: 'Amante de los gatos y la programación',
        publicaciones: []
      },
      Publicacion: {
        id: 1,
        usuario_id: 1,
        url_imagen: 'https://ejemplo.com/gato.jpg',
        descripcion: 'Mi gato favorito',
        likes: 42,
        fecha_creacion: '2026-06-29T10:30:00Z'
      },
      RegistroRequest: {
        nombre_usuario: 'gato_programador',
        nombre_completo: 'Gato Programador',
        email: 'gato@example.com',
        password: 'segura123',
        foto_perfil: 'https://ejemplo.com/foto.jpg'
      },
      LoginRequest: {
        email: 'gato@example.com',
        password: 'segura123'
      },
      CrearPublicacionRequest: {
        url_imagen: 'https://ejemplo.com/gato.jpg',
        descripcion: 'Mi gato favorito'
      },
      ActualizarPerfilRequest: {
        nombre_completo: 'Gato Programador Avanzado',
        biografia: 'Amante de los gatos y la programación',
        foto_perfil: 'https://ejemplo.com/nueva-foto.jpg'
      },
      ErrorResponse: {
        message: 'Descripción del error'
      }
    }
  }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('✓ swagger_output.json generado correctamente');
});