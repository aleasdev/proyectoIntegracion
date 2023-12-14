import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";
import NavbarLink from "../NavbarLink";

// Componente Navbar
const Navbar = () => {
  // Estado para determinar si se ha hecho scroll
  const [isScrolled, setIsScrolled] = useState(false);
  // Obtiene la ubicación actual de la ruta
  const location = useLocation();
  // Obtiene el contexto del usuario
  const { user, dispatch } = useUserContext();

  console.log({ navbar: user });

  console.log({ location });

  // Maneja el evento de scroll
  function handleScroll() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }

  // Maneja el logout del usuario
  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    console.log({ user });
    localStorage.removeItem("habitit-user");
    console.log(user);
  }

  // Efecto de useEffect para añadir el evento de scroll al cargar el componente
  useEffect(() => {
    window.onscroll = function () {
      handleScroll();
    };
  }, []);

  // Renderiza la barra de navegación
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md ${
        isScrolled ? "border-b shadow-sm bg-/70" : ""
      }`}
    >
      <div className="max-w-7xl px-4 py-5 mx-auto flex justify-between items-center ">
        <div className="grow flex items-center ">
          {/* Enlace al inicio */}
          <Link to="/">
            <h1 className="font-semibold text-2xl tracking-wide border-b-4 text--600">
              Hábitos<span className=" pl-px "></span>
            </h1>
          </Link>
        </div>
        <div className="flex flex-col items-center sm:flex-row gap-4 ">
          <div className="flex gap-4 mt-[2px]">
            {/* Enlaces de la barra de navegación */}
            <NavbarLink to="/">Inicio</NavbarLink>
            <NavbarLink to="/full-list">Todos los Hábitos</NavbarLink>
            {/* <NavbarLink to="/survey">Todos los Hábitos</NavbarLink> */}
            <NavbarLink to="/survey">Encuesta de ansiedad</NavbarLink>
          </div>
          <div className="flex items-center divide-x divide-solid divide-gray-400/50 border rounded-md bg-[#e9eae9] ">
            {!user ? (
              // Se muestra cuando el usuario no ha iniciado sesión
              <>
                <div className="px-2 py-1 hover:bg-[#d7d9d8] duration-300 rounded-l-md">
                  <NavbarLink to="/login" borderBottom={false}>
                    Iniciar sesión
                  </NavbarLink>
                </div>
                <div className="px-2 py-1 hover:bg-[#d7d9d8] duration-300 rounded-r-md">
                  <NavbarLink to="/signup" borderBottom={false}>
                    Registrarse
                  </NavbarLink>
                </div>
              </>
            ) : (
              // Se muestra cuando el usuario ha iniciado sesión
              <button
                className="px-2 py-1 hover:bg-[#d7d9d8] rounded-md duration-300 "
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

