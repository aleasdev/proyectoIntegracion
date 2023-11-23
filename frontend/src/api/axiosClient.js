// Importamos la biblioteca axios para realizar solicitudes HTTP.
import axios from "axios";

// Configuración básica para axios, que incluye la URL base, el tiempo de espera y la gestión de credenciales.
const config = {
  baseURL: "http://localhost:4000/api",  // URL base para las solicitudes
  // timeout: 2000,  // Tiempo máximo de espera para las solicitudes (actualmente comentado)
  withCredentials: true,  // Indica si se deben enviar credenciales en las solicitudes (por ejemplo, cookies)
};

// Creamos una instancia de axios con la configuración proporcionada.
const axiosClient = axios.create(config);

// Exportamos la instancia de axios configurada para su uso en otros archivos.
export default axiosClient;
