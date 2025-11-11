import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // Cargar variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;

// 🔹 Conectar a MongoDB
connectDB();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Rutas principales
app.use("/api/auth", authRoutes);

// 🔹 Ruta raíz de prueba (para verificar en Render)
app.get("/", (req, res) => {
  res.send("Servidor funcionando y conectado a MongoDB ✅");
});

// 🔹 Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
