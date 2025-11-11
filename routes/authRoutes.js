import express from "express";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post("/register", registerUser);

export default router;
