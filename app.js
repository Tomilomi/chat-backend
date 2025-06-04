import express from 'express';
import sequelize from './db/db.js';
import authRoutes from './routes/auth.routes.js';
import imageRoutes from "./routes/image.routes.js"
import http from "http";
import { Server } from "socket.io";
import { socketHandler } from "./sockets/socket.js"
import cors from "cors";
import logger from "morgan";

const app = express();
const server = http.createServer(app)
const PORT = 3000;

const io = new Server(server, {
  cors: {
    origin: "*", // O el frontend si lo tenés definido
    methods: ["GET", "POST", "PUT", "DELETE"]
  },
  connectionStateRecovery: {}
});



app.use(cors())

// Middleware para parsear JSON
app.use(express.json());

app.use(logger("dev"))

// Montar tus rutas bajo un prefijo común
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes)
// app.use('/api/users', userRoutes); // cuando lo tengas



socketHandler(io);

// Conexión e inicio
async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.query("SET IDENTITY_INSERT Picture ON")
    console.log('Conexión con la base de datos exitosa');
  } catch (error) {
    console.log('Error tratando de conectar a la base de datos:\n', error);
  }

  server.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
  });
}

start();
