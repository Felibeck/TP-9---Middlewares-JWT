import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import publicacionesRoutes from './routes/posts.js';
import usuariosRoutes from './routes/users.js';
import pool from './config/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.get('/api/health', (_, res) => {
  res.status(200).json({ message: 'Servidor funcionando correctamente' });
});

app.use((err, _, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor' });
});

async function iniciar() {
  try {
    await pool.query('SELECT NOW()');
    console.log('✓ Conexión a base de datos establecida');

    app.listen(PORT, () => {
      console.log(`✓ Servidor WatchGram corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('✗ Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
}

iniciar();

export default app;
