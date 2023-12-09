import React from 'react';
import PomodoroTimer from '../components/PomodoroTimer';
import PomodoroHistory from '../components/PomodoroHistory';

const PomodoroPage = () => {
  return (
    <div>
      <PomodoroTimer />
      <PomodoroHistory />
    </div>
  );
};

export default PomodoroPage;