// Importaciones de bibliotecas y componentes necesarios
import ReactSlider from 'react-slider';
import './slider.css'
import SettingsContext from "./SettingsContext";
import {useContext} from "react";
import BackButton from "./BackButton";
import "./pomodoro.css"

// Componente de configuración de la aplicación
function Settings() {
  // Obtener la información de configuración del contexto
  const settingsInfo = useContext(SettingsContext);

  // Renderizar el componente de configuración
  return (
    <div style={{textAlign:'left'}}>
      {/* Configuración de la duración del trabajo */}
      <label>Trabajo: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className={'slider'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.workMinutes}
        onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      {/* Configuración de la duración del descanso */}
      <label>Descanso: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className={'slider green'}
        thumbClassName={'thumb'}
        trackClassName={'track'}
        value={settingsInfo.breakMinutes}
        onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />
      {/* Botón para regresar a la pantalla principal */}
      <div style={{textAlign:'center', marginTop:'20px'}}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
    </div>
  );
}

// Exportar el componente Settings
export default Settings;
