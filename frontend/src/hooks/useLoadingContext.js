import { useContext } from "react";
import { LoadingContext } from "../context/LoadingContext";

// Hook personalizado para acceder al contexto de carga
export const useLoadingContext = () => {
  // Utilizar el hook useContext para obtener el contexto de carga
  const context = useContext(LoadingContext);

  // Verificar si el contexto existe
  if (!context) {
    throw Error(
      "useLoadingContext debe ser utilizado dentro de un LoadingContextProvider"
    );
  }

  // Devolver el contexto obtenido
  return context;
};
