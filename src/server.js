import 'dotenv/config';
import app from './app.js';
import pool from './config/db.js';

const PORT = process.env.PORT || 3000;

async function iniciarServidor() {
  try {
    const resultado = await pool.query('SELECT NOW()');
    console.log('✓ Conexión a base de datos establecida:', resultado.rows[0]);

    app.listen(PORT, () => {
      console.log(`✓ Servidor WatchGram corriendo en http://localhost:${PORT}`);
      console.log(`✓ Endpoints disponibles:`);
      console.log(`  - POST   /api/auth/register`);
      console.log(`  - POST   /api/auth/login`);
      console.log(`  - GET    /api/publicaciones`);
      console.log(`  - POST   /api/publicaciones (requiere JWT)`);
      console.log(`  - GET    /api/usuarios/perfil (requiere JWT)`);
      console.log(`  - PUT    /api/usuarios/perfil (requiere JWT)`);
    });
  } catch (error) {
    console.error('✗ Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
}

iniciarServidor();
