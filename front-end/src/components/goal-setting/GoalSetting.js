import React from 'react';
import GoalSettingCard from './GoalSettingCard';
import 'App.css';

const App = () => {
  return (
    <div className="app-container">
      <h1 className="pageTitle" style={{marginBottom:20}}>~Set Your Fitness Goals~</h1>

      <GoalSettingCard />
    </div>
  );
};

export default App;