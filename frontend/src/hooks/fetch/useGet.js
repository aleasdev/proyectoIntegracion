import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import useUserContext from "../useUserContext";

const useGet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showNotificationOnDelay, setShowNotificationOnDelay] = useState(false);
  const { user } = useUserContext();

  // Función para realizar la solicitud GET
  async function getRequest(...rest) {
    let response;

    try {
      // Verificar si el usuario está autenticado
      if (!user) {
        setError("Usuario no ha iniciado sesión");
        return;
      }

      const url = rest[0];
      // Configurar encabezados con token de autenticación si es necesario
      let headers = rest[1]?.withAuthHeader
        ? {
            Authorization: `Bearer ${user.token}`,
          }
        : {};
      console.log({ headers });

      // Iniciar carga antes de la solicitud
      setLoading(true);
      // Realizar la solicitud GET utilizando axiosClient
      response = await axiosClient.get(`${url}`, { headers });
      // Finalizar carga después de la solicitud
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

  // Devolver las variables y la función de solicitud GET
  return { getRequest, loading, error };
};

export default useGet;
