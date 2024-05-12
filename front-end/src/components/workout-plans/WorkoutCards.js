import React, { useState, useEffect } from 'react';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkoutCards = () => {
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

    useEffect(() => {
        const fetchWorkoutPlans = async () => {
            try {
                const response = await fetch(`/fitness-tracker/getWorkoutPlans`); // Replace with your workout plan API endpoint
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

        fetchWorkoutPlans();
    }, []);

    const handleCardClick = (planId) => {
        setSelectedPlanId(planId === selectedPlanId ? null : planId); // Toggle selected state
    };

    const handleAssignWorkout = async (planId) => {
        try {
            const response = await fetch(`/fitness-tracker/mapWorkoutPlans/${planId}`, {
                method: 'POST', // Use POST for adding data
                headers: {
                    'Content-Type': 'application/json', // Set content type for JSON data
                },
                body: JSON.stringify({ userId: user.uid }),
            });
            if (!response.ok) {
                toast.error("Workout plan already added.");
            }else{
                toast.success("Workout Plan assigned successfully.");
            }
        } catch (err) {
            console.error('Error assigning workout plan:', err); // Log error for debugging
        }
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
                            <button onClick={() => handleAssignWorkout(plan.workoutPlanId)}>
                                Assign to Self
                            </button>
                            <ToastContainer
                                position="bottom-center" // Set default position for all toasts
                                autoClose={2000} />
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default WorkoutCards;
