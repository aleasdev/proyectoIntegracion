// Importamos la biblioteca React para la creación de componentes.
import React from "react";

// Definimos el componente funcional Footer.
const Footer = () => {
    return (
        // Estructura del pie de página con una línea divisoria en la parte superior, contenido centrado y texto de copyright.
        <div className="border-t flex justify-center items-center h-16 text-sm tracking-wider">
            <p>Copyright&copy; {new Date().getFullYear()}, Proyecto de Integración</p>
        </div>
    );
};

// Exportamos el componente Footer para que pueda ser utilizado en otros archivos.
export default Footer;