import User from "../models/User.js";

// Controlador para registrar un nuevo usuario
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validar campos obligatorios
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El correo electrónico ya está registrado." });
    }

    // Crear el nuevo usuario
    const newUser = await User.create({ name, email, password });

    res.status(201).json({
      message: "Usuario registrado exitosamente.",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    res.status(500).json({ message: "Error del servidor." });
  }
};
