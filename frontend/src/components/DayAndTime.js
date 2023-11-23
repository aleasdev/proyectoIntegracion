import React from "react";
import { useDate, useDay } from "../utils/date";

// Componente para mostrar el día de la semana y la hora actual
const DayAndTime = () => {
   // Obtener la fecha y la hora utilizando los hooks personalizados
   const { time } = useDate();
   const { day } = useDay();

   return (
      <div>
         {/* Título con el día de la semana */}
         <h2 className="text-center text-xl font-semibold">{day}</h2>
         {/* Subtítulo con la hora actual */}
         <h4 className="text-center text-lg">{time}</h4>
      </div>
   );
};

export default DayAndTime;
