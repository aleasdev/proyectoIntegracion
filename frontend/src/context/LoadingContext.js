import { createContext, useEffect, useReducer } from "react";

// Crear el contexto para gestionar el estado de carga
export const LoadingContext = createContext();

// Estado inicial para el contexto de carga
const initialState = { loading: false, error: null };

// Reducer para gestionar el estado de carga
export const loadingReducer = (prevState, action) => {
  switch (action.type) {
    // Indicar que la carga está en progreso
    case "LOADING":
      return { ...prevState, loading: true };
    // Indicar que la carga ha finalizado
    case "LOADED":
      return { ...prevState, loading: false };
    // Manejar un error
    case "ERROR":
      return { ...prevState, error: action.payload };
    // Eliminar un error previo
    case "REMOVE_ERROR":
      return { ...prevState, error: null };
    // Caso por defecto, devolver el estado sin cambios
    default:
      return prevState;
  }
};

// Proveedor del contexto para el estado de carga
export const LoadingContextProvider = ({ children }) => {
  // Utilizar el useReducer para gestionar el estado
  const [{ loading, error }, dispatch] = useReducer(loadingReducer, initialState);

  // Imprimir información de estado en la consola
  console.log(
    `Loading State -> ${loading}, Error State -> ${error} from LoadingContextProvider.`
  );

  // Renderizar el proveedor de contexto con el estado y el dispatcher
  return (
    <LoadingContext.Provider value={{ loading, error, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};
