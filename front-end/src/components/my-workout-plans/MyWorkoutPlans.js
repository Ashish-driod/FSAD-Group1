import React from 'react';

import 'App.css';
import '../workout-plans/style.css';
import MyWorkoutCards from "./MyPlans";

const MyWorkoutPlans = () => {
    return (
        <div className="app-container">
            <h1 className="pageTitle" style={{marginBottom:20}}>~My Workout Plans~</h1>

            <MyWorkoutCards />
        </div>
    );
};

export default MyWorkoutPlans;
