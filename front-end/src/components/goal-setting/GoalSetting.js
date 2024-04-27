import React, { useState } from 'react';
import 'App.css';

function GoalSetting() {
  // State to manage the form inputs
  const [goalType, setGoalType] = useState('');
  const [goalValue, setGoalValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can implement further logic here, like sending the goal data to a server
    const goalData = {
      goalType,
      goalValue,
      startDate,
      endDate
    };

    console.log("Goal Data:" , goalData)
    try {

      // Display loading indicator
      setIsLoading(true);
      // Send goalData to the backend API
      const response = await fetch('http://example.com/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(goalData)
      });

      if (response.ok) {
        // Handle successful API response (e.g., show success message)
        setSuccessMessage('Goal set successfully!');
        setErrorMessage('');
        console.log('Goal set successfully!');
      } else {
        // Handle API error response
        const errorData = await response.json();
        setErrorMessage(`Failed to set goal: ${errorData.message}`);
        setSuccessMessage('');
        console.error('Failed to set goal:', response.statusText);
      }
    } catch (error) {
     // Handle network error or other exception
     setErrorMessage(`Error setting goal: ${error.message}`);
     setSuccessMessage('');
    }
    finally {
      // Hide loading indicator
      setIsLoading(false);
    }
    
    console.log("Goal Type:", goalType, "Goal Value:", goalValue, "Start Date:", startDate, "End Date:", endDate);
  };

  // Define goal types and corresponding fields
  const goalTypeFields = {
    weightLoss: {
      label: "Target Weight Loss (lbs)",
      placeholder: "Enter target weight loss",
    },
    muscleGain: {
      label: "Target Muscle Gain (%)",
      placeholder: "Enter target muscle gain percentage",
    },
    runDistance: {
      label: "Target Running Distance (miles)",
      placeholder: "Enter target running distance",
    },
    yogaSessions: {
      label: "Target Yoga Sessions",
      placeholder: "Enter target number of yoga sessions",
    },
    calorieBurn: {
      label: "Target Daily Calorie Burn",
      placeholder: "Enter target daily calorie burn",
    },
    stepsPerDay: {
      label: "Target Steps per Day",
      placeholder: "Enter target steps per day",
    },
    hydration: {
      label: "Daily Water Intake (oz)",
      placeholder: "Enter daily water intake goal",
    },
  };

  // Render goal-specific input field based on selected goal type
  const renderGoalField = () => {
    if (goalType && goalTypeFields[goalType]) {
      const { label, placeholder } = goalTypeFields[goalType];
      return (
        <div>
          <label htmlFor="goalValue">{label}:</label>
          <input
            type="number"
            id="goalValue"
            value={goalValue}
            style={{ color: 'black' }}
            className="goalTypeContainer dateInput"
            onChange={(e) => setGoalValue(e.target.value)}
            placeholder={placeholder}
            required
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bodyBackground">
      <h1 className="text-4xl font-bold background-image align-items: center headingBorder" style={{marginBottom:20}}>Set Your Goals Here</h1>
      {successMessage && <div className="successMessage">{successMessage}</div>}
        {errorMessage && <div className="errorMessage">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
      <div>
          <label htmlFor="goalType" className="text-2xl font-bold goalTypeContainer" style={{ color: 'red' }}>Select Goal Type:</label>
          <select
            id="goalType"
            value={goalType}
            onChange={(e) => setGoalType(e.target.value)}
            required
            className="goalTypeContainer"
          >
            <option value="">Select Goal Type</option>
            <option value="weightLoss">Weight Loss</option>
            <option value="muscleGain">Muscle Gain</option>
            <option value="runDistance">Run Distance</option>
            <option value="yogaSessions">Yoga Sessions</option>
            <option value="calorieBurn">Daily Calorie Burn</option>
            <option value="stepsPerDay">Steps per Day</option>
            <option value="hydration">Hydration</option>
          </select>
        </div>
        {renderGoalField()}
        <div>
          <label htmlFor="startDate" className="text-2xl font-bold" style={{ color: 'red' }}>Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            className="goalTypeContainer dateInput"
            style={{ color: 'black' }}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endDate" className="text-2xl font-bold" style={{ color: 'red' }}>End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            className="goalTypeContainer dateInput"
            style={{ color: 'black' }}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button className="button" type="submit" disabled={isLoading}>{isLoading ? 'Setting Goal...' : 'Set Goal'}</button>

      </form>

    </div>
  );
}

export default GoalSetting;
