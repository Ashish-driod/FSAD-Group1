import React, { useState } from 'react';
import 'App.css';


const GoalSettingCard = () => {
    const [showMessage, setShowMessage] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [goalType, setGoalType] = useState('');
    const [goalValue, setGoalValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [userGoals, setUserGoals] = useState([]);

    const goalTypeOptions = [
        'Weight Loss',
        'Muscle Gain',
        'Cardio Endurance',
        'Flexibility',
        'Strength Training',
        'Overall Fitness'
    ];

    const handleSetGoal = () => {
        // Logic to handle goal setting (e.g., show a modal or navigate to a goal setting page)
        console.log('Redirecting to goal setting page...');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // Reset form fields
        setGoalType('');
        setGoalValue('');
        setStartDate('');
        setEndDate('');
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission (e.g., save goal details)
        console.log('Goal Type:', goalType);
        console.log('Goal Value:', goalValue);
        console.log('Start Date:', startDate);
        console.log('End Date:', endDate);

        const newGoal = {
            type: goalType,
            value: goalValue,
            startDate: startDate,
            endDate: endDate
        };
        // Update userGoals state with the new goal
        setUserGoals([...userGoals, newGoal]);
        handleCloseModal(); // Close modal after submission
    };

    const handleSaveGoals = async () => {
        try {

            // Prepare goals array with formatted goal objects
            const goalsArray = userGoals.map((goal) => ({
                type: goal.type,
                value: goal.value,
                startDate: goal.startDate,
                endDate: goal.endDate
            }));

            console.log("Goals Array:" , goalsArray);

            const response = await fetch('http://example.com/api/goals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ goals: goalsArray })

            });
            console.log(userGoals);

            if (response.ok) {
                console.log('Goals sent to backend successfully!');
                // Optionally, clear userGoals state after successful submission
                setUserGoals([]);
            } else {
                console.error('Failed to send goals to backend:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending goals to backend:', error);
        }
    };

    return (
        <div className="goal-setting-container">
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2 className="pageTitle" style={{ marginBottom: 20 }}>Set Goal</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label className="text-2xl font-bold goalTypeContainer bodyBorder" style={{ color: 'black' }}>
                                Goal Type:
                                <select
                                    value={goalType}
                                    onChange={(e) => setGoalType(e.target.value)}
                                    required
                                >
                                    <option className="goalTypeContainer"
                                        value="">Select Goal Type</option>
                                    {goalTypeOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <br />
                            <label className="text-2xl font-bold goalTypeContainer bodyBorder" style={{ color: 'black' }}>
                                Goal Value:
                                <input
                                    type="text"
                                    value={goalValue}
                                    style={{ color: 'black' }}
                                    className="goalTypeContainer dateInput"
                                    onChange={(e) => setGoalValue(e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <label className="text-2xl font-bold goalTypeContainer bodyBorder" id="endDateLabel" style={{ color: 'black' }}>
                                Start Date:
                                <input
                                    type="date"
                                    value={startDate}
                                    className="goalTypeContainer dateInput"
                                    style={{ color: 'black' }}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <label className="text-2xl font-bold goalTypeContainer bodyBorder" id="endDateLabel" style={{ color: 'black' }}>
                                End Date:
                                <input
                                    type="date"
                                    value={endDate}
                                    className="goalTypeContainer dateInput"
                                    style={{ color: 'black' }}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </label>
                            <br />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="goal-list">
                {userGoals.map((goal, index) => (
                    <div key={index} className="goal-card">
                        <h3 className="text-3xl font-bold">Goal {index + 1}</h3>
                        <p>
                            <strong className="text-2xl font-bold">Type:</strong> {goal.type}<br />
                            <strong className="text-2xl font-bold">Value:</strong> {goal.value}<br />
                            <strong className="text-2xl font-bold">Start Date:</strong> {goal.startDate}<br />
                            <strong className="text-2xl font-bold">End Date:</strong> {goal.endDate}
                        </p>
                    </div>
                ))}
            </div>

            <div className="goal-message">
                <p>{userGoals.length === 0 ? 'No goal has been set up for this user.Add some GOALS NOW!!' : 'Set Another Goal'}</p>
                <button onClick={handleSetGoal}>Set Goal</button>
            </div>
            <br></br>
            {/* Save button for sending goals to backend */}
            {userGoals.length > 0 && (
                <div className="save-goals">
                    <button onClick={handleSaveGoals}>Save Goals</button>
                </div>
            )}

        </div>

    );
};

export default GoalSettingCard;