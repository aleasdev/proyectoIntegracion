import { useEffect } from "react";
import { quotes } from "../data/quotes";

// Componente para mostrar citas de Atomic Habits
const Quotes = () => {
  // Obtener el índice de la cita almacenado en el localStorage
  let quoteIndex = localStorage.getItem("quote-index");

  // Si el índice no existe en el localStorage, inicializarlo a 0
  if (!quoteIndex) {
    localStorage.setItem("quote-index", 0);
  }

  // Si el índice es igual a la longitud de las citas, reiniciar a 0
  if (+quoteIndex === quotes.length) {
    localStorage.setItem("quote-index", 0);
  }

  // Obtener el índice actualizado después de las comprobaciones
  quoteIndex = localStorage.getItem("quote-index");

  console.log({ quoteIndex });

  // Efecto para incrementar el índice en 1 cuando el componente se monta
  useEffect(() => {
    return localStorage.setItem("quote-index", `${+quoteIndex + 1}`);
  }, []);

  // Renderizar la cita actual
  return (
    <div className="text-[#529B7C] mt-6 text-center italic text-lg font-semibold">
      " {quotes[+quoteIndex]} "{" "}
      <span className="text-gray-600 font-semibold text-xs">
        ~ de Atomic Habits
      </span>
    </div>
  );
};

export default Quotes;
