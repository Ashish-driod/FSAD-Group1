import React, { useState } from 'react';
import 'App.css';

function GoalSetting() {
  // State to manage the form inputs
  const [goal, setGoal] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [duration, setDuration] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [dietPlan, setDietPlan] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [exerciseType, setExerciseType] = useState('');
  const [calorieBurn, setCalorieBurn] = useState('');


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement further logic here, like sending the goal data to a server
    console.log("Goal:", goal, "Current Weight:", currentWeight, "Target Weight:", targetWeight, "Duration:", duration, "Activity Level:", activityLevel, "Diet Plan:", dietPlan, "Exercise Type:", exerciseType, "Calorie Burn:", calorieBurn);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold background-image align-items: center">Set Your Goals Here</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="goal" style={{ color: 'red' }} className='text-2xl'>Fitness Goal:</label>
          <input
            type="text"
            id="goal"
            style={{ color: 'black' }}
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Lose Weight, Gain Muscle, etc."
            required
          />
        </div>
        <div>
          <label className="font-bold" htmlFor="currentWeight">Current Weight (lbs):</label>
          <input
            type="number"
            id="currentWeight"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="font-bold" htmlFor="targetWeight">Target Weight (lbs):</label>
          <input
            type="number"
            id="targetWeight"
            style={{ color: 'black' }}
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="font-bold" htmlFor="duration" style={{ color: 'black' }}>Duration (in weeks):</label>
          <input
            type="number"
            id="duration"
            value={duration}
            style={{ color: 'black' }}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="font-bold" htmlFor="activityLevel">Activity Level:</label>
          <select
            id="activityLevel"
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
            required
          >
            <option value="">Select Activity Level</option>
            <option value="sedentary">Sedentary (little to no exercise)</option>
            <option value="lightlyActive">Lightly Active (light exercise/sports 1-3 days/week)</option>
            <option value="moderatelyActive">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
            <option value="veryActive">Very Active (hard exercise/sports 6-7 days a week)</option>
            <option value="extraActive">Extra Active (very hard exercise/sports & physical job or 2x training)</option>
          </select>
        </div>
        <break></break>
        <div>
          <label className="font-bold" htmlFor="dietPlan">Diet Plan:</label>
          <select
            id="dietPlan"
            value={dietPlan}
            onChange={(e) => setDietPlan(e.target.value)}
            required
          >
            <option value="">Select Diet Plan</option>
            <option value="lowCarb">Low Carb</option>
            <option value="keto">Keto</option>
            <option value="paleo">Paleo</option>
            <option value="vegan">Vegan</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="flexitarian">Flexitarian</option>
          </select>
        </div>
        <div>
          <label className="font-bold" htmlFor="exerciseType">Preferred Exercise Type:</label>
          <select
            id="exerciseType"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
            required
          >
            <option value="">Select Exercise Type</option>
            <option value="cardio">Cardio</option>
            <option value="weightlifting">Weightlifting</option>
            <option value="yoga">Yoga</option>
            <option value="pilates">Pilates</option>
            <option value="hiit">HIIT</option>
            <option value="crossfit">CrossFit</option>
          </select>
        </div>
        <div>
          <label htmlFor="calorieBurn">Target Calorie Burn per Day:</label>
          <input
            type="number"
            id="calorieBurn"
            value={calorieBurn}
            style={{ color: 'black' }}
            onChange={(e) => setCalorieBurn(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit">Set Goal</button>
      </form>
    </div>
  );
}

export default GoalSetting;
