import express from 'express';
import authRoutes from './routes/auth.js';
import publicacionesRoutes from './routes/posts.js';
import usuariosRoutes from './routes/users.js';

const app = express();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/publicaciones', publicacionesRoutes);
app.use('/api/usuarios', usuariosRoutes);

app.get('/api/health', (_, res) => {
  res.status(200).json({ message: 'Servidor funcionando correctamente' });
});

app.use((err, _, res) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Error interno del servidor' });
});

export default app;
