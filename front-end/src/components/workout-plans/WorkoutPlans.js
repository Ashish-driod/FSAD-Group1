import React from 'react';

import 'App.css';
import './style.css';
import WorkoutCards from "./WorkoutCards";

const WorkoutPlans = () => {
    return (
        <div className="app-container">
            <h1 className="pageTitle" style={{marginBottom:20}}>~Available Workout Plans~</h1>

            <WorkoutCards />
        </div>
    );
};

export default WorkoutPlans;
