import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PomodoroHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('/api/pomodoros').then((response) => {
      setHistory(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Historial Pomodoro</h2>
      <ul>
        {history.map((pomodoro) => (
          <li key={pomodoro._id}>
            {pomodoro.taskName} - {pomodoro.startTime} to {pomodoro.endTime}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PomodoroHistory;