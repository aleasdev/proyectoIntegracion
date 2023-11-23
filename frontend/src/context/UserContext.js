import { createContext, useEffect, useReducer } from "react";

// Crear el contexto para gestionar el estado del usuario
export const UserContext = createContext();

// Obtener el valor del usuario del almacenamiento local
let localValue = localStorage.getItem("habitit-user");

// Estado inicial basado en el valor almacenado localmente o nulo si no existe
const initialState = localValue ? JSON.parse(localValue) : null;

// Reducer para gestionar el estado del usuario
export const userReducer = (prevState, action) => {
  switch (action.type) {
    // Acción de inicio de sesión
    case "LOGIN":
      return { ...action.payload };
    // Acción de cierre de sesión
    case "LOGOUT":
      return null;
    // Caso por defecto, devolver el estado sin cambios
    default:
      return prevState;
  }
};

// Proveedor del contexto para el estado del usuario
export const UserContextProvider = ({ children }) => {
  // Utilizar el useReducer para gestionar el estado del usuario
  const [user, dispatch] = useReducer(userReducer, initialState);

  // Imprimir información de estado en la consola
  console.log("User State from UserContextProvider: ", user);

  // Renderizar el proveedor de contexto con el estado y el dispatcher
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

