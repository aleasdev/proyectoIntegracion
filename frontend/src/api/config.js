// Definimos una función llamada 'config' que toma tres parámetros: 'method', 'url' y 'data'.
const config = (method, url, data) => {
  // Devolvemos un objeto con las propiedades 'method', 'url' y 'data', que se asignan con los valores proporcionados.
  return {
    method,  // Método HTTP para la solicitud (GET, POST, etc.)
    url,     // URL a la que se realizará la solicitud
    data,    // Datos que se enviarán en el cuerpo de la solicitud (puede ser null si no hay datos)
  };
};

// Exportamos la función 'config' para que pueda ser utilizada en otros archivos.
export default config;