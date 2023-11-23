const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Función para crear un token JWT
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// Iniciar sesión de usuario
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Intentar iniciar sesión usando el método login del modelo User
    const user = await User.login(email, password);
    
    // Crear un token JWT
    const token = createToken(user._id);
    
    // Responder con la información del usuario y el token
    res.status(200).json({ name: user.name, email, token });
  } catch (error) {
    // Manejar errores en caso de fallo en la autenticación
    res.status(400).json({ error: error.message });
  }
};

// Registrarse como nuevo usuario
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Intentar registrar un nuevo usuario usando el método signup del modelo User
    const user = await User.signup(name, email, password);
    
    // Crear un token JWT
    const token = createToken(user._id);
    
    // Responder con la información del usuario y el token
    res.status(200).json({ name, email, token });
  } catch (error) {
    // Manejar errores en caso de fallo en el registro
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
