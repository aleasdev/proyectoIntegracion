import React from "react";
import AddNewHabitForm from "../components/AddNewHabitForm";

// Página para crear un nuevo hábito
const Create = () => {
   return (
      <div className="h-[70vh] flex justify-center items-center">
         {/* Componente del formulario para agregar un nuevo hábito */}
         <AddNewHabitForm />
      </div>
   );
};

export default Create;
