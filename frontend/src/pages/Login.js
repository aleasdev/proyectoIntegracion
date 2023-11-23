import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import useLogin from "../hooks/useLogin";

const Login = () => {
  // Estados para almacenar el correo electrónico, la contraseña y los mensajes de error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({ email: "", password: "" });
  // Utilizar el hook de login personalizado
  const { login, loading, error } = useLogin();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar campos requeridos
    if (email.trim() === "" || password.trim() === "") {
      email.trim() === "" &&
        setErrorMessage((prev) => {
          return { ...prev, email: "Campo requerido" };
        });
      password.trim() === "" &&
        setErrorMessage((prev) => {
          return { ...prev, password: "Campo requerido" };
        });
      return;
    }
    // Expresión regular para validar el formato de correo electrónico
    const emailRegEx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // Validar el formato del correo electrónico
    if (!emailRegEx.test(email)) {
      setErrorMessage((prev) => {
        return { ...prev, email: "Dirección de correo electrónico inválida" };
      });
      return;
    }
    // Validar longitud mínima de la contraseña
    if (password.length < 6) {
      setErrorMessage((prev) => {
        return {
          ...prev,
          password: "Se requieren al menos 6 caracteres",
        };
      });
      return;
    }
    // Intentar iniciar sesión con el correo electrónico y la contraseña
    await login({ email, password });

    // Imprimir información de carga y errores en la consola
    console.log({ loading, error: error.response.data.error });
    // Manejar errores
    if (error) {
      return;
    }
    // Limpiar los campos después de un inicio de sesión exitoso
    setEmail("");
    setPassword("");
  };

  // Efecto para limpiar los mensajes de error al cambiar el correo electrónico o la contraseña
  useEffect(() => {
    if (email.trim() !== "") {
      setErrorMessage((prev) => {
        return { ...prev, email: "" };
      });
    }
    if (password.trim() !== "") {
      setErrorMessage((prev) => {
        return { ...prev, password: "" };
      });
    }
  }, [email, password]);

  // Efecto para manejar mensajes de error específicos al cambiar el estado de error
  useEffect(() => {
    if (error && error.response.data.error === "Correo electrónico incorrecto") {
      setErrorMessage((prev) => {
        return { ...prev, email: error.response.data.error };
      });
      return;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, email: "" };
      });
    }
    if (error && error.response.data.error === "Contraseña incorrecta") {
      setErrorMessage((prev) => {
        return { ...prev, password: error.response.data.error };
      });
      return;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, password: "" };
      });
    }
  }, [error]);

  // Renderizar el formulario de inicio de sesión
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-12 py-16 shadow-lg rounded-xl mt-8 w-full md:w-2/3 sm:mx-auto flex flex-col gap-4"
    >
      <h4 className="text-lg text-center font-bold mb-2">Iniciar sesión</h4>

      <div className="w-full flex flex-col gap-2">
        <label>Correo electrónico:</label>
        <FormInput
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <p className="text-red-400 text-sm ml-4">{errorMessage.email}</p>
      </div>

      <div className="w-full flex flex-col gap-2">
        <label>Contraseña:</label>
        <FormInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-400 text-sm ml-4">{errorMessage.password}</p>
      </div>

      <input
        type="submit"
        value="Iniciar sesión"
        disabled={loading}
        className={`mt-4 bg-white/60 hover:bg-gray-100 hover:border-gray-400 text-sm px-3 py-2 border-2 border-gray-400/50 rounded-full cursor-pointer focus:border-gray-500/80 transition-colors ease-in-out duration-300 font-semibold ${
          loading && "text-gray-300 hover:border-gray-300"
        }`}
      />
    </form>
  );
};

export default Login;
