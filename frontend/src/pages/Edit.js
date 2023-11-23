import React from "react";
import AddNewHabitForm from "../components/AddNewHabitForm";

// Página para editar un hábito existente
const Edit = () => {
   return (
      <div className="h-[70vh] flex justify-center items-center">
         {/* Componente del formulario para agregar un nuevo hábito con la prop 'edit' */}
         <AddNewHabitForm edit />
      </div>
   );
};

export default Edit;
