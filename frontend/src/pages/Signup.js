import { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  // Estados para almacenar el nombre, correo electrónico, contraseña y mensajes de error
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
  });
  // Utilizar el hook de registro personalizado
  const { signup, loading, error } = useSignup();

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    // Validar campos requeridos
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      name.trim() === "" &&
        setErrorMessage((prev) => {
          return { ...prev, name: "Campo requerido" };
        });
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
    // Minimum eight characters, at least one upper case English letter, one lower case English letter, one number and one special character
    //Minimo 6 caracteres, al menos 1 mayuscula, al menos 1 numero y un valor especial (#?!@$ %^&*-)
    const passwordRegEx = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{6,}$/;  

    if (!passwordRegEx.test(password)) {
      setErrorMessage((prev) => {
        return {
          ...prev,
          password: "Minimo 6 caracteres, al menos 1 mayuscula, al menos 1 numero y un valor especial (#?!@$ %^&*-)",
        };
      });
      return;
    }
    // Imprimir información de nombre, correo electrónico y contraseña en la consola
    console.log({ name, email, password });
    // Intentar registrarse con el nombre, correo electrónico y contraseña proporcionados
    await signup({ name, email, password });
    // Imprimir información de carga y errores en la consola
    console.log({ loading, error: error.response.data.error });
    // Manejar errores
    if (error) {
      return;
    }
    // Limpiar los campos después de un registro exitoso
    setName("");
    setEmail("");
    setPassword("");
  };

  // Efecto para limpiar los mensajes de error al cambiar el nombre, correo electrónico o contraseña
  useEffect(() => {
    if (name.trim() !== "") {
      setErrorMessage((prev) => {
        return { ...prev, name: "" };
      });
    }
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
  }, [name, email, password]);

  // Efecto para manejar mensajes de error específicos al cambiar el estado de error
  useEffect(() => {
    if (error && error.response.data.error === "Correo electrónico ya en uso") {
      setErrorMessage((prev) => {
        return { ...prev, email: error.response.data.error };
      });
      return;
    } else {
      setErrorMessage((prev) => {
        return { ...prev, email: "" };
      });
    }
  }, [error]);

  // Renderizar el formulario de registro
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white px-12 py-16 shadow-lg rounded-xl mt-8 w-full md:w-2/3 sm:mx-auto flex flex-col gap-4"
    >
      <h4 className="text-lg text-center font-bold mb-2">Registrarse</h4>

      <div className="w-full flex flex-col gap-2">
        <label>Nombre :</label>
        <FormInput
          type="string"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <p className="text-red-400 text-sm ml-4">{errorMessage.name}</p>
      </div>

      <div className="w-full flex flex-col gap-2">
        <label>Email :</label>
        <FormInput
          type="string"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <p className="text-red-400 text-sm ml-4">{errorMessage.email}</p>
      </div>

      <div className="w-full flex flex-col gap-2">
        <label>Contraseña :</label>
        <FormInput
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <p className="text-red-400 text-sm ml-4">{errorMessage.password}</p>
      </div>

      <input
        type="submit"
        value="Registrarse"
        disabled={loading}
        className={`mt-4 bg-white/60 hover:bg-gray-100 hover:border-gray-400 text-sm px-3 py-2 border-2 border-gray-400/50 rounded-full cursor-pointer focus:border-gray-500/80 transition-colors ease-in-out duration-300 font-semibold ${
          loading && "text-gray-300 hover:border-gray-300"
        }`}
      />
    </form>
  );
};

export default Signup;
