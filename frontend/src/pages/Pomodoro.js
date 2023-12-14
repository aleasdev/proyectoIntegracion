import React from "react";
import { useState } from "react";
import Timer from "../components/pomodoro/Timer";
import Settings from "../components/pomodoro/Settings";
import SettingsContext from "../components/pomodoro/SettingsContext";

const Pomodoro = () => {
    
    const [showSettings, setShowSettings] = useState(false);
    const [workMinutes, setWorkMinutes] = useState(45);
    const [breakMinutes, setBreakMinutes] = useState(15);

    return (
        <div>
            <SettingsContext.Provider value={{
                showSettings,
                setShowSettings,
                workMinutes,
                breakMinutes,
                setWorkMinutes,
                setBreakMinutes,
                }}>
                {showSettings ? <Settings /> : <Timer />}
            </SettingsContext.Provider>
        </div>
    )
}

export default Pomodoro;