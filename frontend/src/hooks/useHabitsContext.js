import { HabitsContext } from "../context/HabitsContext";
import { useContext } from "react";

// Hook personalizado para acceder al contexto de hábitos
export const useHabitsContext = () => {
  // Utilizar el hook useContext para obtener el contexto de hábitos
  const context = useContext(HabitsContext);

  // Verificar si el contexto existe
  if (!context) {
    throw Error(
      "useHabitsContext debe ser utilizado dentro de un HabitsContextProvider"
    );
  }

  // Devolver el contexto obtenido
  return context;
};
