package com.fsad.fitness.demo.repository;

import com.fsad.fitness.demo.model.UserWorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserWorkoutPlanRepository extends JpaRepository<UserWorkoutPlan,Integer> {



}
