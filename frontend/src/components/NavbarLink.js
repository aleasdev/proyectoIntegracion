import React from "react";
import { NavLink } from "react-router-dom";

// Componente para crear enlaces en la barra de navegación
const NavbarLink = ({ to, children, borderBottom = true }) => {
  // Clases CSS para estilos de efecto después de hacer hover
  let afterClasses =
    "after:opacity-0 hover:after:opacity-100  after:content-['']   after:h-[3px] after:bg-gray-700  after:transform after:duration-500 after:w-0 hover:after:w-full after:-mt-[2px]";
  // Clases CSS básicas del enlace
  let classes = ` hover:text-gray-700 cursor-pointer flex flex-col justify-center items-center  duration-500 ${
    borderBottom ? afterClasses : ""
  }`;
  // Clases CSS para el estado activo del enlace
  let activeClasses = "text-gray-700 font-medium";

  return (
    // Enlace de navegación (NavLink) con clases dinámicas basadas en el estado activo
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${classes} ${activeClasses}` : classes
      }
    >
      {children}
    </NavLink>
  );
};

export default NavbarLink;
