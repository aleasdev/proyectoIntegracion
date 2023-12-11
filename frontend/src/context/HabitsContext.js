import { createContext, useReducer } from "react";

// Crear el contexto para gestionar el estado de los hábitos
export const HabitsContext = createContext();

// Reducer para gestionar el estado de los hábitos
export const habitsReducer = (state, action) => {
  switch (action.type) {
    // Establecer los hábitos de hoy
    case "SET_TODAY_HABITS":
      return {
        ...state,
        todayHabits: action.payload,
      };
    // Establecer todos los hábitos
    case "SET_ALL_HABITS":
      return {
        ...state,
        allHabits: action.payload,
      };
    // Establecer los hábitos ordenados
    case "SET_SORTED_HABITS":
      return {
        ...state,
        sortedHabits: action.payload,
      };
    // Establecer la opción de ordenación
    case "SET_SORT_OPTION":
      return {
        ...state,
        sortOption: action.payload,
      };
    // Agregar un nuevo hábito
    case "ADD_HABIT":
      return {
        ...state,
        allHabits: [action.payload, ...state.allHabits],
      };
    // Actualizar un hábito existente
    case "UPDATE_HABIT":
      return {
        ...state,
        todayHabits: state.todayHabits.map((habit) => {
          if (habit._id === action.payload._id) {
            return action.payload;
          }
          return habit;
        }),
        allHabits: state.allHabits.map((habit) => {
          if (habit._id === action.payload._id) {
            return action.payload;
          }
          return habit;
        }),
      };
    // Eliminar un hábito
    case "DELETE_HABIT":
      return {
        ...state,
        todayHabits: state.todayHabits.filter(
          (item) => item._id !== action.payload
        ),
        allHabits: state.allHabits.filter(
          (item) => item._id !== action.payload
        ),
      };
    // Establecer el hábito que se va a editar
    case "TO_BE_EDITED":
      return {
        ...state,
        toBeEdited: action.payload,
      };
    // Establecer el índice de la cita
    case "SET_QUOTE_INDEX":
      return {
        ...state,
        quoteIndex: action.payload,
      };
    // Caso por defecto, devolver el estado sin cambios
    default:
      return state;
  }
};

// Obtener la opción de ordenación y el índice de la cita del localStorage
const initialSortOption = localStorage.getItem("sort-option")
  ? localStorage.getItem("sort-option")
  : "newest-first";

const initialQuoteIndex = localStorage.getItem("quote-index")
  ? localStorage.getItem("quote-index")
  : 0;

// Obtener la fecha actual formateada
const d = new Date();
const day = d.getDate();
const month = d.getMonth();
const year = d.getFullYear();
const formattedDate = `${day}/${month}/${year}`;

// Proveedor del contexto para el estado de los hábitos
export const HabitsContextProvider = ({ children }) => {
  // Inicializar el estado utilizando el useReducer
  const [state, dispatch] = useReducer(habitsReducer, {
    todayHabits: [],
    allHabits: [],
    sortedHabits: [],
    sortOption: initialSortOption,
    toBeEdited: { title: "", reps: [], reminders: [] },
    quoteIndex: initialQuoteIndex,
    date: formattedDate,
  });

  // Renderizar el proveedor de contexto con el estado y el dispatcher
  return (
    <HabitsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HabitsContext.Provider>
  );
};

