package com.fsad.fitness.demo.service;

import com.fsad.fitness.demo.model.Exercise;
import com.fsad.fitness.demo.repository.ExerciseRepository;
import com.fsad.fitness.demo.repository.WorkoutPlanExerciseRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private WorkoutPlanExerciseRepository workoutPlanExerciseRepository;



    @Transactional
    public Exercise addExercise(Exercise exercise){
        return exerciseRepository.save(exercise);
    }

    public List<Exercise> getAllExercisesByWorkoutPlanId(int workoutPlanId){
        return exerciseRepository.getAllExercisesForWorkoutPlanId(workoutPlanId);
    }


}
