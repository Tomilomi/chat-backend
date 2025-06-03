import express from 'express';
import sequelize from './db/db.js';
import authRoutes from './routes/auth.routes.js';
import imageRoutes from "./routes/image.routes.js"

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Montar tus rutas bajo un prefijo común
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes)
// app.use('/api/users', userRoutes); // cuando lo tengas



// Conexión e inicio
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.query("SET IDENTITY_INSERT Picture ON")
    console.log('Conexión con la base de datos exitosa');
  } catch (error) {
    console.log('Error tratando de conectar a la base de datos:\n', error);
  }

  app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });
}

start();
