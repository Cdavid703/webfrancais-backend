import express from "express";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/register", registerUser);

export default router;
// Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "El usuario no existe. Regístrate primero." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta." });
    }

    res.status(200).json({ message: "Inicio de sesión exitoso", user });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
});
