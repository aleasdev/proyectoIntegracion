// TuComponente.js

import React from 'react';

const Survey = () => {
  const formHeight = window.innerWidth > 800 ? "800px" : "600px"; // Establece la altura del formulario según el ancho de la ventana

  return (
    <div className='survey'>
      {/* Pega tu código <iframe> de Google Forms aquí */}
      <iframe
        className='survey-iframe'
        src="https://docs.google.com/forms/d/e/1FAIpQLSf_W7_rgZxf3VSwReIgNQUVFHwAcjTBHOwD1Fe7_TethMkbdA/viewform?embedded=true"
        width={window.innerWidth > 800 ? "640" : "420"}
        height={formHeight} // Establece la altura del iframe según el tamaño del formulario
      >
        Cargando…
      </iframe>  
    </div>
  );
};

export default Survey;
