package com.fsad.fitness.demo.repository;

import com.fsad.fitness.demo.model.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan,Integer> {

}
