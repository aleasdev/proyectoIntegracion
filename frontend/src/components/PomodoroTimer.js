import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PomodoroTimer = () => {
  const [workTime, setWorkTime] = useState(25 * 60); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes in seconds
  const [timer, setTimer] = useState(workTime);
  const [isActive, setIsActive] = useState(false);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 0) {
            savePomodoro();
            return breakTime; // Switch to break time when work time is up
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, timer, breakTime]);

  const savePomodoro = () => {
    axios
      .post('/api/pomodoros', {
        startTime: new Date(),
        endTime: new Date(),
        taskName: taskName,
      })
      .then((response) => {
        console.log('Pomodoro saved successfully:', response.data);
        resetTimer();
      })
      .catch((error) => {
        console.error('Error saving Pomodoro:', error);
      });
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimer(workTime);
    setTaskName('');
  };

  const finishPomodoro = () => {
    if (isActive) {
      savePomodoro();
    }
  };

  return (
    <div>
      <h2>Pomodoro Timer</h2>
      <div>
        <p>Task: {taskName || 'No task set'}</p>
        <input
          type="text"
          placeholder="Enter task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
      </div>
      <div>
        <p>Time Remaining: {Math.floor(timer / 60)}:{(timer % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}</p>
      </div>
      <div>
        <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={finishPomodoro}>Finish</button>
      </div>
    </div>
  );
};

export default PomodoroTimer;