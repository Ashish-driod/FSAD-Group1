package com.fsad.fitness.demo.repository;

import com.fsad.fitness.demo.model.WorkoutPlanExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutPlanExerciseRepository extends JpaRepository<WorkoutPlanExercise,Integer> {

}
