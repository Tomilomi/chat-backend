import express from "express";
import UserService from "../services/user.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();
const userService = new UserService();

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_super_secreto";

// Registro
router.post("/register", async (req, res) => {
  try {
    const { user_name, user_password } = req.body;

    if (!user_name || !user_password) {
      return res.status(400).json({ error: "Nombre y contraseña son requeridos" });
    }

    // Verificar si usuario ya existe
    const existingUser = await userService.findByUsername(user_name);
    if (existingUser) {
      return res.status(409).json({ error: "El usuario ya existe" });
    }

    // Crear usuario (el servicio se encarga de hashear la contraseña)
    const newUser = await userService.createNewUser({ user_name, user_password });
    res.status(201).json({ message: "Usuario creado", userId: newUser.user_id });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { user_name, user_password } = req.body;

    if (!user_name || !user_password) {
      return res.status(400).json({ error: "Nombre y contraseña son requeridos" });
    }

    const user = await userService.findByUsername(user_name);

    if (!user) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    // Comparar password con bcrypt
    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
    }

    // Generar token JWT
    const token = jwt.sign({ userId: user.user_id, userName: user.user_name }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login exitoso", token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
