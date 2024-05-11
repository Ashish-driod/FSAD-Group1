package com.fsad.fitness.demo.repository;

import com.fsad.fitness.demo.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise,Integer> {

    @Query(value = "SELECT exercise.exercises_id,exercise.name,exercise.description,exercise.muscle_group,exercise.equipment_needed,exercise.created_at,exercise.modified_at,exercise.sets,exercise.reps FROM Exercises exercise JOIN WorkoutPlanExercises wpe on exercise.exercises_id = wpe.exercise_id WHERE wpe.workout_plan_id = :workoutPlanId", nativeQuery = true)
    List<Exercise> getAllExercisesForWorkoutPlanId(@Param("workoutPlanId") int workoutPlanId);

}
