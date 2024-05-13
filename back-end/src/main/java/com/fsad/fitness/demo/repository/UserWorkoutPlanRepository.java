package com.fsad.fitness.demo.repository;

import com.fsad.fitness.demo.model.UserWorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserWorkoutPlanRepository extends JpaRepository<UserWorkoutPlan,Integer> {

    List<UserWorkoutPlan> findByUserId(String userId);

    UserWorkoutPlan findByUserIdAndWorkoutPlanId(String userId,int workoutPlanId);

    UserWorkoutPlan deleteUserWorkoutPlanByUserIdAndWorkoutPlanId(String userId,int workoutPlanId);

}
