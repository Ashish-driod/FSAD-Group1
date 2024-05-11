package com.fsad.fitness.demo.service;

import com.fsad.fitness.demo.model.WorkoutPlan;
import com.fsad.fitness.demo.repository.UserWorkoutPlanRepository;
import com.fsad.fitness.demo.repository.WorkoutPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutPlanService {

    @Autowired
    WorkoutPlanRepository workoutPlanRepository;

    @Autowired
    UserWorkoutPlanRepository userWorkoutPlanRepository;

    public List<WorkoutPlan> getAllWorkoutPlans(){
        return workoutPlanRepository.findAll();
    }

    public List<WorkoutPlan> getWorkoutPlansByUserId(String userId){

        return workoutPlanRepository.getAllWorkoutPlanByUserId(userId);

    }
}
