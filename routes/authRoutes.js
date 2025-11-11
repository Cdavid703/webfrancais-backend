import express from "express";
import User from "../models/User.js";

const router = express.Router();

// ✅ Registro de usuario
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

// ✅ Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Debes ingresar correo y contraseña." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "El usuario no existe. Regístrate primero." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});

export default router;
