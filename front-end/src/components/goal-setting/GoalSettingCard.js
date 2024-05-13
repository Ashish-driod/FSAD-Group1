import React, { useState, useEffect } from 'react';
import 'App.css';
import { useUserCredential } from 'contexts/UserContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Button, Modal, Input, Select, Card } from "react-daisyui";





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
    const [landingMode, setLandingMode] = useState(true);
    const [successDeleteMessage, setSuccessDeleteMessage] = useState('');
    const [selectedGoalForShare, setSelectedGoalForShare] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [reloadGoals, setReloadGoals] = useState(false);

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
            finally {
                setLoading(false); // Set loading to false when done fetching
            }
        };

        if (editMode || landingMode) {
            fetchSavedGoals();
        }
    }, [editMode, landingMode, reloadGoals]);

    //Deleting each goal

    const handleDeleteGoal = async (goalId) => {
        try {
            const response = await fetch(`/fitness-tracker/deleteGoal/${goalId}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                // Update savedGoals state after deletion
                const updatedGoals = savedGoals.filter((goal) => goal.goalId !== goalId);
                setSavedGoals(updatedGoals);
                setSuccessDeleteMessage('Goal deleted successfully!!!');
                console.log('Goal deleted successfully!');
            } else {
                console.error('Failed to delete goal:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting goal:', error);
        }
    };

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

    const handleCancelNewGoal = () => {
        // Reset userGoals to clear the new goal data
        setUserGoals({});
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
                setReloadGoals((prevState) => !prevState);
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

    const handleShareGoal = (goal) => {
        setSelectedGoalForShare(goal);
        setShowShareModal(true);
    };

    const handleShareOption = (option) => {
        if (option === 'Email') {
            // Prepare the email content
            const subject = `Fitness Goal: ${selectedGoalForShare.goalType}`;
            const body = `Dear recipient,\n\nI wanted to share my fitness goal with you:\n\nType: ${selectedGoalForShare.goalType}\nValue: ${selectedGoalForShare.targetValue}\nStart Date: ${selectedGoalForShare.startDate}\nEnd Date: ${selectedGoalForShare.endDate || 'No end date'}\n\nBest regards,\n[Your Name]`;

            // Construct the mailto URL with subject and body parameters
            const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open the mailto URL to initiate composing an email
            window.location.href = mailtoUrl;
        } else {
            console.log(`Sharing ${selectedGoalForShare.goalType} via ${option}`);
            // Implement other share options as needed
        }

        // Close the share modal
        setShowShareModal(false);
    };

    return (
        <div className="goal-setting-container">
            {showModal && (
                <dialog open={showModal} className="modal_goal" onClose={handleCloseModal}>

                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal} style={{ fontSize: '24px', cursor: 'pointer' }}>&times;</span>
                        <h2 className="pageTitle" style={{ marginBottom: 20 }}>Set Goal</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="grid grid-cols-2 items-center gap-4">
                                <label className=" text-2xl font-bold text-center" htmlFor="goal">
                                    Goal Type:
                                </label>
                                <Select name={'goalType'} value={goalType} onChange={(e) => setGoalType(e.target.value)}
                                    required>
                                    <option className="text-md leading-6 text-gray-900" value={'default'} disabled>
                                        Please pick a Goal Type
                                    </option>
                                    {goalTypeOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </Select>
                            </div>


                            <br />
                            <div className="grid grid-cols-2 items-center gap-4">
                                <label className="text-2xl font-bold text-center" htmlFor="goalValue">
                                    Goal Value:
                                </label>
                                <Input type='text' value={goalValue} placeholder={'Add Target Value'}
                                    onChange={(e) => setGoalValue(e.target.value)}
                                    color={'neutral'}
                                    className="text-md leading-6 text-gray-900"
                                    style={{
                                        backgroundColor: 'white', color: 'black',
                                        padding: '8px', // Padding for spacing
                                        borderRadius: '4px', // Border radius for rounded corners
                                        border: '1px solid #ccc'
                                    }}
                                    required
                                />
                            </div>

                            <br />
                            <div className="grid grid-cols-2 items-center gap-4">
                                <label className="text-2xl font-bold text-center" htmlFor="startDate">
                                    Start Date:
                                </label>
                                <Input type='date' value={startDate} placeholder={'Start Date'}
                                    color={'neutral'}
                                    className="text-md leading-6 text-gray-900"
                                    style={{
                                        backgroundColor: 'white', color: 'black',
                                        padding: '8px', // Padding for spacing
                                        borderRadius: '4px', // Border radius for rounded corners
                                        border: '1px solid #ccc'
                                    }}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    required />
                            </div>

                            <br />
                            <div className="grid grid-cols-2 items-center gap-4">
                                <label className="text-2xl font-bold text-center" htmlFor="endDate">
                                    End Date:
                                </label>
                                <Input type='date' value={endDate} placeholder={'End Date'}
                                    color={'neutral'}
                                    className="text-md leading-6 text-gray-900"
                                    style={{
                                        backgroundColor: 'white', color: 'black',
                                        padding: '8px', // Padding for spacing
                                        borderRadius: '4px', // Border radius for rounded corners
                                        border: '1px solid #ccc'
                                    }}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required />
                            </div>

                            <br />

                            <Modal.Actions>
                                <Button color={"primary"} >Submit</Button>
                                <Button onClick={handleCloseModal}>Close</Button>
                            </Modal.Actions>


                        </form>
                    </div>
                </dialog>
            )}

            {/* Render saved goals in edit mode */}
            {/* Render saved goals in edit or landing mode */}
            {/* Render saved goals in edit or landing mode */}
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
                    <button onClick={handleCancelNewGoal}>Cancel</button>
                </div>
            )}

            <div className="goal-setting-container">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {/* Render your goals content here */}
                        {(editMode || landingMode) && savedGoals.length === 0 ? (
                            <div className="goal-message">
                                {successMessage && (
                                    <div className="success-message">
                                        <p>{successMessage}</p>

                                    </div>
                                )}

                                <p>No goal has been set up for this user. Set a new goal now!</p>
                                <button onClick={handleSetGoal}>Set Goal</button>
                            </div>
                        ) : (
                            <div className="goal-container">
                                {successMessage && (
                                    <div className="success-message">
                                        <p>{successMessage}</p>

                                    </div>
                                )}
                                {successDeleteMessage && (
                                    <div className="success-message">
                                        <p>{successDeleteMessage}</p>
                                    </div>
                                )}
                                <div className="goal-cards-container">

                                    {savedGoals.map((goal, index) => (
                                        <div key={goal.goalId} className="goal-card">
                                            <h3>Saved Goal {index + 1}</h3>
                                            <p>
                                                <strong>Type:</strong> {goal.goalType}<br />
                                                <strong>Value:</strong> {goal.targetValue}<br />
                                                <strong>Start Date:</strong> {goal.startDate}<br />
                                                <strong>End Date:</strong> {goal.endDate || 'No end date'}
                                            </p>
                                            <Modal.Actions>
                                                <button onClick={() => handleDeleteGoal(goal.goalId)}>Delete Goal</button>
                                                <button onClick={() => handleShareGoal(goal)}>Share Goal</button>
                                            </Modal.Actions>
                                        </div>
                                    ))}
                                </div>
                                <div className="button-container">
                                    <button className="set-goal-button" onClick={handleSetGoal}>Set Goal</button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>


            {showShareModal && (
                <div className="modal_goal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowShareModal(false)}>&times;</span>
                        <h2>Share Goal</h2>
                        <p>Share your goal using:</p>
                        <ul>
                            <button onClick={() => handleShareOption('Email')}>Email</button>
                            {/* <button onClick={() => handleShareOption('Facebook')}>Facebook</button>
                            <button onClick={() => handleShareOption('Twitter')}>Twitter</button> */}
                            {/* Add more share options as needed */}
                        </ul>
                    </div>
                </div>
            )}

        </div>

    );
};

export default GoalSettingCard;
