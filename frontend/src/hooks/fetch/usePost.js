import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import useUserContext from "../useUserContext";

const usePost = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showNotificationOnDelay, setShowNotificationOnDelay] = useState(false);
  const { user } = useUserContext();

  // Función para realizar la solicitud POST
  async function postRequest(...rest) {
    const url = rest[0];
    const payload = rest[1];
    // Configurar encabezados con token de autenticación si es necesario
    const headers = rest[2]?.withAuthHeader
      ? { Authorization: `Bearer ${user.token}` }
      : {};

    // Iniciar carga antes de la solicitud
    setLoading(true);
    let response;

    try {
      // Realizar la solicitud POST utilizando axiosClient
      response = await axiosClient.post(`${url}`, payload, { headers });
      // Finalizar carga después de la solicitud exitosa
      setLoading(false);
    } catch (error) {
      console.log({ error });
      // Finalizar carga en caso de error y establecer el error
      setLoading(false);
      setError(error);
    }
    return response;
  }

  // Efecto para mostrar la notificación después de un retraso
  useEffect(() => {
    if (loading && !showNotificationOnDelay) {
      setTimeout(() => {
        setShowNotificationOnDelay(true);
      }, 3000);
    }
  }, [loading]);

  // Efecto para mostrar la notificación después de un retraso específico
  //useEffect(() => {
  //  if (loading && showNotificationOnDelay) {
  //    toast.info(
  //      "Podrías experimentar cierto retraso debido a la política de inactividad de 15 minutos aplicada por render.com para sus planes gratuitos.",
  //      { autoClose: 10000 }
  //    );
  //  }
  //}, [showNotificationOnDelay]);

  // Devolver las variables y la función de solicitud POST
  return { postRequest, loading, error };
};

export default usePost;
