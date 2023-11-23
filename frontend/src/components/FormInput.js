import React from "react";

// Componente reutilizable para entrada de formulario
const FormInput = (props) => {
  return (
    // Se utiliza un input con propiedades extendidas (props)
    <input
      {...props}
      className="bg-white/60 px-4 py-2 outline outline-1 outline-slate-300/70 text-sm rounded-full focus:rounded-full focus:outline-2 focus:outline-[#92dbbC]"
    />
  );
};

export default FormInput;
