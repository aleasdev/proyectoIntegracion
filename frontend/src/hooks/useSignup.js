import usePost from "./fetch/usePost";
import useUserContext from "./useUserContext";

// Hook personalizado para gestionar el proceso de registro
const useSignup = () => {
  // Obtener el contexto del usuario para despachar acciones
  const { dispatch } = useUserContext();
  // Utilizar el hook personalizado usePost para realizar solicitudes POST
  const { postRequest, loading, error } = usePost();

  // Función para registrar un nuevo usuario
  const signup = async ({ name, email, password }) => {
    // Crear un objeto con la información del nuevo usuario
    const payload = { name, email, password };

    // Realizar la solicitud POST para registrar al nuevo usuario
    const response = await postRequest("/user/signup", payload);

    // Verificar si la respuesta existe
    if (response) {
      // Despachar la acción de inicio de sesión y almacenar datos en el almacenamiento local
      dispatch({ type: "LOGIN", payload: response.data });
      localStorage.setItem("habitit-user", JSON.stringify(response.data));
      localStorage.setItem("browsed", JSON.stringify(true));
    }
  };

  // Devolver las funciones y variables necesarias para la interfaz
  return { signup, loading, error };
};

export default useSignup;
