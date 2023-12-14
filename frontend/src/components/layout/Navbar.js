import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useUserContext from "../../hooks/useUserContext";
import NavbarLink from "../NavbarLink";
import React from "react";


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
    const [navbarOpen, setNavbarOpen] = React.useState(true);
    // Renderiza la barra de navegación
    return (
        <header className={`sticky top-0 z-50 backdrop-blur-md ${isScrolled ? "border-b shadow-sm bg-/70" : ""}`}>
            <div className="max-w-7xl px-4 py-5 mx-auto flex justify-between items-center ">
                <div className="grow flex items-center ">
                    {/* Enlace al inicio */}
                    <Link to="/">
                        <h1 className="font-semibold text-2xl tracking-wide  text--600">
                            Hábitos<span className=" pl-px "></span>
                        </h1>
                    </Link>

                </div>
                

                <div className={
              "flex flex-col items-center sm:flex-row gap-4 " +
              (navbarOpen ? " flex" : " hidden")
            }>
                    <div className="flex gap-4 mt-[2px]">
                        {/* Enlaces de la barra de navegación */}
                        
                        <a
                            className=" hover:text-gray-700 cursor-pointer flex flex-col justify-center items-center  duration-500 after:opacity-0 hover:after:opacity-100  after:content-['']   after:h-[3px] after:bg-gray-700  after:transform after:duration-500 after:w-0 hover:after:w-full after:-mt-[2px] text-gray-700 "
                            href="https://habitos-newsteller.netlify.app"
                        >
                            Newsteller
                        </a>
                    </div>
                    
                    <div className="flex gap-4 mt-[2px]">
                        {!user ? (
                            // Se muestra cuando el usuario no ha iniciado sesión
                            <>
                                <div className="px-2 py-1 hover:bg-[#d7d9d8] duration-300 rounded-l-md">
                                    <NavbarLink to="/login" >
                                        Iniciar sesión
                                    </NavbarLink>
                                </div>
                                <div className="px-2 py-1 hover:bg-[#d7d9d8] duration-300 rounded-r-md">
                                    <NavbarLink to="/signup">
                                        Registrarse
                                    </NavbarLink>
                                </div>
                            </>
                        ) : (
                            // Se muestra cuando el usuario ha iniciado sesión
                            
                            <div className="flex gap-4 mt-[2px]">
                              <NavbarLink to="/">Inicio</NavbarLink>
                              <NavbarLink to="/full-list">Todos los Hábitos</NavbarLink>
                              <NavbarLink to="/survey">Encuesta de ansiedad</NavbarLink>

                            <button className="hover:text-gray-700 cursor-pointer flex flex-col justify-center items-center  duration-500 after:opacity-0 hover:after:opacity-100  after:content-['']   after:h-[3px] after:bg-gray-700  after:transform after:duration-500 after:w-0 hover:after:w-full after:-mt-[2px] text-gray-700" onClick={handleLogout}>
                                Cerrar sesión
                            </button>
                            </div>
                        )}
                    </div>


                    
                </div>
                <button
                        className="text-black cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                        type="button"
                        onClick={() => setNavbarOpen(!navbarOpen)}
                      >
                        
                        <i class="fa fa-bars" aria-hidden="true"></i>

                    </button>
                
                
            </div>
        </header>
    );
};

export default Navbar;
