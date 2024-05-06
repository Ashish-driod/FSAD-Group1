import React, { useState, useEffect } from 'react';
import 'App.css';
import { useUserCredential } from 'contexts/UserContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';




const GoalSettingCard = () => {
    const [showMessage, setShowMessage] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [goalType, setGoalType] = useState('');
    const [goalValue, setGoalValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [userGoals, setUserGoals] = useState({});
    const { userCredential } = useUserCredential();
    const [userId, setUserId] = useState(''); // User ID
    const [successMessage, setSuccessMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [savedGoals, setSavedGoals] = useState([]);
    const [landingMode, setLandingMode] = useState(false);

    const auth = getAuth();
    const user = auth.currentUser;

    onAuthStateChanged(auth, (user) => {
        const uid = user?.uid;
        if (uid) {
            console.log("user", user);
        }
    })

    const goalTypeOptions = [
        'Weight Loss',
        'Muscle Gain',
        'Cardio Endurance',
        'Flexibility',
        'Strength Training',
        'Overall Fitness'
    ];

    useEffect(() => {
        const fetchSavedGoals = async () => {
            try {

                onAuthStateChanged(auth, (user) => {
                    const uid = user?.uid;
                    if (uid) {
                        console.log("user", user);
                    }
                })

                const response = await fetch(`/fitness-tracker/getAllGoal?userId=${user?.uid}`);
                if (response.ok) {
                    const data = await response.json();
                    setSavedGoals(data); // Assuming API response contains a 'goals' array
                    console.log("Saved Goals:", data)
                } else {
                    console.error('Failed to fetch saved goals:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching saved goals:', error);
            }
        };

        if (editMode || landingMode) {
            fetchSavedGoals();
        }
    }, [editMode, landingMode]);

    const handleSetGoal = () => {
        // Logic to handle goal setting (e.g., show a modal or navigate to a goal setting page)
        console.log('Redirecting to goal setting page...');
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        // Reset form fields
        resetForm();

    };

    const resetForm = () => {
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

        onAuthStateChanged(auth, (user) => {
            const uid = user?.uid;
            if (uid) {
                console.log("user", user);
            }
        })

        const newGoal = {
            "userId": user?.uid,
            "goalType": goalType,
            "targetValue": goalValue,
            "startDate": startDate,
            "endDate": endDate || null
        };
        // Update userGoals state with the new goal
        setUserGoals(newGoal);
        handleCloseModal(); // Close modal after submission
    };

    const handleSaveGoals = async () => {

        try {


            console.log("Goals Object:", userGoals);
            console.log("userCreds:", userCredential);



            const response = await fetch(`/fitness-tracker/addGoal`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userGoals)

            });
            //console.log("goalsWithUserId", goalsWithUserId);

            if (response.ok) {
                console.log('Goals sent to backend successfully!');
                // Optionally, clear userGoals state after successful submission
                setSuccessMessage('Goals saved successfully!!!!');
                setUserGoals({});
            } else {
                console.error('Failed to send goals to backend:', response.statusText);
                setSuccessMessage('Failed to save goals. Please try again.');
            }
        } catch (error) {
            console.error('Error sending goals to backend:', error);
            setSuccessMessage('Error sending goals. Please try again.');
        }
    };

    const handleEditGoals = () => {
        setEditMode(true);
        setSuccessMessage('');
    };

    const handleLandingGoals = () => {
        setLandingMode(true);
        setSuccessMessage('');
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

            {/* Render saved goals in edit mode */}
            {/* Render saved goals in edit or landing mode */}
            {/* Render saved goals in edit or landing mode */}
            {(editMode || landingMode) && savedGoals.length > 0 && (
                <div className="goal-container">
                    {successMessage && (
                        <div className="success-message">
                            <p>{successMessage}</p>

                        </div>
                    )}
                    <div className="goal-cards-container">
                        {savedGoals.map((goal, index) => (
                            <div key={index} className="goal-card">
                                <h3>Saved Goal {index + 1}</h3>
                                <p>
                                    <strong>Type:</strong> {goal.goalType}<br />
                                    <strong>Value:</strong> {goal.targetValue}<br />
                                    <strong>Start Date:</strong> {goal.startDate}<br />
                                    <strong>End Date:</strong> {goal.endDate || 'No end date'}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {userGoals.userId && !successMessage && (
                <div className="new-goal-card">
                    <h3>New Goal</h3>
                    <p>
                        <strong>Type:</strong> {userGoals.goalType}<br />
                        <strong>Value:</strong> {userGoals.targetValue}<br />
                        <strong>Start Date:</strong> {userGoals.startDate}<br />
                        <strong>End Date:</strong> {userGoals.endDate || 'No end date'}
                    </p>
                    <button onClick={handleSaveGoals}>Save Goal</button>
                </div>
            )}

            {/* Display message if no goals are set */}
            {(editMode || landingMode) && savedGoals.length === 0 && (
                <div className="goal-message">
                    <p>No goal has been set up for this user. Set a new goal now!</p>
                    <button onClick={handleSetGoal}>Set Goal</button>
                </div>
            )}

            {/* Trigger the handleLandingGoals function */}

            <div className="button-container">
                {successMessage && (
                    <div className="success-message">
                        <p>{successMessage}</p>

                    </div>
                )}
                <h2 className="goals-bar" style={{ marginBottom: 20 }}>Set Your Fitness Goals Or View Your Goals!!</h2>
                <button className="view-goals-button" onClick={handleLandingGoals}>View Goals</button>
                <button className="set-goal-button" onClick={handleSetGoal}>Set Goal</button>
            </div>



        </div>

    );
};

export default GoalSettingCard;
