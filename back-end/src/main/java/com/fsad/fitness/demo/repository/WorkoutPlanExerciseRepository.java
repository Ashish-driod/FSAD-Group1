package com.fsad.fitness.demo.repository;


import com.fsad.fitness.demo.model.Exercise;
import com.fsad.fitness.demo.model.WorkoutPlanExercises;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutPlanExerciseRepository extends JpaRepository<WorkoutPlanExercises,Integer> {


}
