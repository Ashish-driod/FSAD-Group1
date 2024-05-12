import React, {useEffect, useMemo, useState} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {toast, ToastContainer} from "react-toastify";
import { FaTrashAlt } from 'react-icons/fa';

const MyWorkoutCards = () => {
    const [workoutPlans, setWorkoutPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPlanId, setSelectedPlanId] = useState(null); // Track selected plan ID


    const auth = getAuth();
    const user = auth.currentUser;

    onAuthStateChanged(auth, (user) => {
        const uid = user?.id;
        if (uid) {
            console.log("user", user);
        }
    })

    const handleDeleteWorkout = async (planId) => {
        try {
            const response = await fetch(`/fitness-tracker/deleteWorkoutPlan/${planId}`, {
                method: 'DELETE', // Use DELETE for removing data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.uid }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete workout plan');
            }
            toast.success('Workout plan deleted successfully!');
            fetchWorkoutPlans();
            // fetchWorkoutPlans(); // Refresh workout plans after deletion
        } catch (error) {
            toast.error(`Error deleting workout plan: ${error.message}`);
            console.error('Error deleting workout plan:', error);
        }

    };

    const fetchWorkoutPlans = async () => {
        try {
            const response = await fetch(`/fitness-tracker/getWorkoutPlan?userId=${user?.uid}`); // Replace with your workout plan API endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch workout plans');
            }
            const data = await response.json();
            setWorkoutPlans(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }

    };

    useMemo(() => {
        fetchWorkoutPlans();
    },[]);

    useEffect(() => {

    }, []);

    const handleCardClick = (planId) => {
        setSelectedPlanId(planId === selectedPlanId ? null : planId); // Toggle selected state
    };


    const renderExercise = (exercise) => (
        <li key={exercise.exercises_id}>
            {exercise.name} (Sets: {exercise.sets}, Reps: {exercise.reps})
        </li>
    );

    return (
        <div className="workout-cards-container">
            {loading ? (
                <p>Loading workout plans...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                workoutPlans.map((plan) => (
                    <div key={plan.workoutPlanId} className="workout-card">
                        <div className="workout-card-title-container"> {/* Added container div */}
                            <h3 className="workout-card-title">{plan.workoutPlanName}</h3>
                        </div>
                        <p>{plan.workoutPlanDescription}</p>
                        {selectedPlanId === plan.workoutPlanId && (
                            <ul className="exercise-details">
                                <h2>Exercises for {plan.workoutPlanName}</h2>
                                {plan.exerciseList.map(renderExercise)}
                            </ul>
                        )}
                        <div className="button-container">
                            <button onClick={() => handleCardClick(plan.workoutPlanId)}>
                                {selectedPlanId === plan.workoutPlanId ? 'Hide Exercises' : 'Show Exercises'}
                            </button>
                            <button className="delete-button" onClick={() => handleDeleteWorkout(plan.workoutPlanId)}>
                                <FaTrashAlt/> {/* Use the delete icon */}
                            </button>
                            <ToastContainer
                                position="bottom-center" // Set default position for all toasts
                                autoClose={2000}/>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MyWorkoutCards;
