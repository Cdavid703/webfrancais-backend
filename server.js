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

// 🔹 Middleware CORS — permite llamadas desde tu frontend de Netlify y Render
app.use(cors({
  origin: [
    "https://lambent-pixie-d10d05.netlify.app",  // Frontend desplegado (Netlify)
    "http://localhost:5500",                     // Para pruebas locales
    "https://webfrancais-backend.onrender.com"   // Backend Render (por seguridad)
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

// 🔹 Middleware JSON
app.use(express.json());

// 🔹 Registrar rutas principales
app.use("/api/auth", authRoutes);

// 🔹 Ruta raíz (para prueba rápida en Render)
app.get("/", (req, res) => {
  res.send("Servidor funcionando y conectado a MongoDB ✅");
});

// 🔹 Captura de errores global (opcional, mejora depuración)
app.use((err, req, res, next) => {
  console.error("❌ Error general:", err.stack);
  res.status(500).json({ message: "Error interno del servidor." });
});

// 🔹 Iniciar servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
