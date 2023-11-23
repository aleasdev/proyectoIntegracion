import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="grow flex flex-col justify-center max-w-3xl mx-auto m-12 sm:mt-16 md:mt-20 gap-6">
      <div className="flex flex-col justify-center gap-2">
        <h2 className="text-lg font-semibold text-[#36795d]">
          
        </h2>
        
      </div>
      <div>
        Si no te has logueado aun por favor{" "}
        <Link to="/signup" className="underline">
          Registrate
        </Link>{" "}
        primero o{" "}
        <Link to="/login" className="underline">
          Inicia sesión
        </Link>{" "}
        si ya tienes una cuenta 
      </div>
    </div>
  );
};

export default Welcome;
