package com.fsad.fitness.demo.service;


import com.fsad.fitness.demo.model.Activity;
import com.fsad.fitness.demo.repository.ActivityRepository;
import jakarta.transaction.Transactional;

import org.hibernate.exception.DataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;



    @Transactional
    public Activity addActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Activity getActivityById(int activityId) {
    	
        Optional<Activity> activity = activityRepository.findById(activityId);
        if (Objects.isNull(activity)) {
			throw new DataException("No data with the given ID", null);
		}
        return activity.get();
    }

    @Transactional
    public void deleteActivityById(int activityId) {
        Optional<Activity> activity = activityRepository.findById(activityId);
        if (Objects.nonNull(activity)) {
            activityRepository.deleteById(activityId);
        } else {
            throw new DataException("Activity not found", null);
        }
    }
}
