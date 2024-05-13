package com.fsad.fitness.demo.repository;

import com.fsad.fitness.demo.model.ActivitiesGoalsMapping;
import com.fsad.fitness.demo.model.Activity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ActivitiesGoalsMappingRepository extends JpaRepository<ActivitiesGoalsMapping, Integer> {
    // Additional query methods can be added here if needed
	@Query(value = "SELECT activity FROM Activities activity JOIN Activities_Goals_Mapping activityGoalsMap on "
			+ "activity.activity_id = activityGoalsMap.activity_id WHERE activityGoalsMap.user_id = :userId", nativeQuery = true)
	public List<Activity> getActivitiesByGoalId(@Param("userId") String userId);

	@Query(value = "SELECT activityGoalsMap Activities_Goals_Mapping activityGoalsMap "
			+ " WHERE activityGoalsMap.activity_id = :activityId", nativeQuery = true)
	public List<ActivitiesGoalsMapping> getAllActivitiesGoalsMappingsByActivityId(@Param("activityId") Integer activityId); 
	
	@Query(value = "SELECT activityGoalsMap Activities_Goals_Mapping activityGoalsMap "
			+ " WHERE activityGoalsMap.goal_id = :goalId", nativeQuery = true)
	public List<ActivitiesGoalsMapping> getAllActivitiesGoalsMappingsByGoalsId(@Param("goalId") Integer goalId); 
	
}