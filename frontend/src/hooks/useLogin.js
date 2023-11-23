import usePost from "./fetch/usePost";
import useUserContext from "./useUserContext";

// Hook personalizado para gestionar el proceso de inicio de sesión
const useLogin = () => {
  // Obtener el contexto del usuario para despachar acciones
  const { dispatch } = useUserContext();
  // Utilizar el hook personalizado usePost para realizar solicitudes POST
  const { postRequest, loading, error } = usePost();

  // Función para iniciar sesión
  const login = async ({ email, password }) => {
    // Crear un objeto con las credenciales del usuario
    const payload = { email, password };

    // Realizar la solicitud POST para iniciar sesión
    const response = await postRequest("/user/login", payload);

    // Verificar si la respuesta existe
    if (response) {
      // Despachar la acción de inicio de sesión y almacenar datos en el almacenamiento local
      dispatch({ type: "LOGIN", payload: response.data });
      localStorage.setItem("habitit-user", JSON.stringify(response.data));
      localStorage.setItem("browsed", JSON.stringify(true));
    }
  };

  // Devolver las funciones y variables necesarias para la interfaz
  return { login, loading, error };
};

export default useLogin;
