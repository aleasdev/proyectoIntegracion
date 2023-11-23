import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";
import useUserContext from "../useUserContext";

const useDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showNotificationOnDelay, setShowNotificationOnDelay] = useState(false);
  const { user } = useUserContext();

  // Función para realizar la solicitud de eliminación
  async function deleteRequest(...rest) {
    const url = rest[0];
    const headers = rest[1]?.withAuthHeader
      ? { Authorization: `Bearer ${user.token}` }
      : {};
    console.log({ headers });

    setLoading(true);

    let response;

    try {
      response = await axiosClient.delete(`${url}`, { headers });
      setLoading(false);
    } catch (error) {
      console.log({ error });
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
  useEffect(() => {
    if (loading && showNotificationOnDelay) {
      toast.info(
        "Podrías experimentar cierto retraso debido a la política de inactividad de 15 minutos aplicada por render.com para sus planes gratuitos.",
        { autoClose: 10000 }
      );
    }
  }, [showNotificationOnDelay]);

  // Devolver las variables y la función de solicitud de eliminación
  return { deleteRequest, loading, error };
};

export default useDelete;
