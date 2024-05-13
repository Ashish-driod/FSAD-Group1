package com.fsad.fitness.demo.service;


import com.fsad.fitness.demo.model.ActivitiesGoalsMapping;
import com.fsad.fitness.demo.model.Activity;
import com.fsad.fitness.demo.repository.ActivitiesGoalsMappingRepository;
import com.fsad.fitness.demo.repository.ActivityRepository;
import jakarta.transaction.Transactional;

import org.hibernate.exception.DataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;
    
    @Autowired
    private ActivitiesGoalsMappingRepository activitiesGoalsMappingRepository;



    @Transactional
    public Activity addActivity(Activity activity, Integer goalId) {
        Activity activityResult = activityRepository.save(activity);
//        ActivitiesGoalsMapping activitiesGoalsMapping = new ActivitiesGoalsMapping();
//        activitiesGoalsMapping.setActivityId(activityResult.getActivityId());
//        activitiesGoalsMapping.setGoalId(goalId);
//        activitiesGoalsMappingRepository.save(activitiesGoalsMapping);
        return activityResult;
    }

    public List<Activity> getAllActivities(String userId) {
        return activitiesGoalsMappingRepository.getActivitiesByGoalId(userId);
    }

    public Activity getActivityById(int activityId) {
    	
        Optional<Activity> activity = activityRepository.findById(activityId);
        if (Objects.isNull(activity)) {
			throw new DataException("No data with the given ID", null);
		}
        return activity.get();
    }

    public List<Activity> getAllAcvtByUserId(String userId){
        return activityRepository.findByUserId(userId);
    }


    @Transactional
    public void deleteActivityById(int activityId) {
    	Optional<Activity> activity = activityRepository.findById(activityId);
        if (Objects.nonNull(activity)) {
	    	List<ActivitiesGoalsMapping> activitiesGoalsMappings = activitiesGoalsMappingRepository.getAllActivitiesGoalsMappingsByActivityId(activityId);
	    	if (Objects.nonNull(activitiesGoalsMappings) && !activitiesGoalsMappings.isEmpty()) {
	    		List<Integer> activitiesGoalsMappingIds = activitiesGoalsMappings.stream().map(ActivitiesGoalsMapping::getActivityGoalMappingId).collect(Collectors.toList());
		    	activitiesGoalsMappingRepository.deleteAllById(activitiesGoalsMappingIds);
			}
            activityRepository.deleteById(activityId);
        } else {
            throw new DataException("Activity not found", null);
        }
    }
    
    @Transactional
    public void deleteActivityByGoalId(int goalId) {
    	List<ActivitiesGoalsMapping> activitiesGoalsMappings = activitiesGoalsMappingRepository.getAllActivitiesGoalsMappingsByGoalsId(goalId);
    	if (Objects.nonNull(activitiesGoalsMappings) && !activitiesGoalsMappings.isEmpty()) {
    		List<Integer> activitiesGoalsMappingIds = activitiesGoalsMappings.stream().map(ActivitiesGoalsMapping::getActivityGoalMappingId).collect(Collectors.toList());
    		List<Integer> activitiyIds = activitiesGoalsMappings.stream().map(ActivitiesGoalsMapping::getActivityId).collect(Collectors.toList());
    		activitiesGoalsMappingRepository.deleteAllById(activitiesGoalsMappingIds);
            activityRepository.deleteAllById(activitiyIds);
    	} else {
    		throw new DataException("Activity not found", null);
    	}
    }
}
