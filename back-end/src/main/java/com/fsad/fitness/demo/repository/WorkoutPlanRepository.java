package com.fsad.fitness.demo.repository;

import com.fsad.fitness.demo.model.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface WorkoutPlanRepository extends JpaRepository<WorkoutPlan,Integer> {


    @Query(value = "SELECT wp.id,wp.name,wp.description,wp.created_at,wp.modified_at FROM WorkoutPlans wp JOIN UserWorkoutPlan uwp ON wp.id = uwp.workoutPlan_id WHERE uwp.user_id = :userId ",nativeQuery = true)
    List<WorkoutPlan> getAllWorkoutPlanByUserId(@Param("userId")String userId);


}
