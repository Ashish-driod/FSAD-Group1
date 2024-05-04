package com.fsad.fitness.demo.controller;


import com.fsad.fitness.demo.model.Activity;
import com.fsad.fitness.demo.model.Goal; // Import Goal model
import com.fsad.fitness.demo.repository.UserRepository;
import com.fsad.fitness.demo.service.ActivityService;
import com.fsad.fitness.demo.service.GoalService; // Import Goal service

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/fitness-tracker")
public class FitnessTrackerController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    GoalService goalService; // Add the GoalService injection
    
    @Autowired 
    ActivityService activityService; // Add ActivityService injection


    // New endpoint to add a goal
    @Transactional
    @PostMapping("/addGoal")
    public ResponseEntity<Goal> addGoal(@RequestBody Goal goal) {
        Goal createdGoal = goalService.addGoal(goal);
        return ResponseEntity.ok(createdGoal);
    }

    // New endpoint to get all goals
    @GetMapping("/getAllGoal")
    public ResponseEntity<List<Goal>> getAllGoals() {
        List<Goal> goals = goalService.getAllGoals();
        return ResponseEntity.ok(goals);
    }

    // New endpoint to get a goal by ID
    @GetMapping("/getGoal/{goalId}")
    public ResponseEntity<Goal> getGoalById(@PathVariable int goalId) {
        Optional<Goal> goal = goalService.getGoalById(goalId);
        if (goal.isPresent()) {
            return ResponseEntity.ok(goal.get());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Goal not found");
        }
    }
    @DeleteMapping("/deleteGoal/{goalId}")
    public ResponseEntity<Void> deleteGoal(@PathVariable int goalId) {
        try {
            goalService.deleteGoalById(goalId);
            return ResponseEntity.noContent().build(); // Return no content on successful deletion
        } catch (IllegalArgumentException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }

    // New endpoint to add a activity
    @Transactional
    @PostMapping("/addActivity")
    public ResponseEntity<Activity> addActivity(@RequestBody Activity activity) {
        Activity activityEntity = activityService.addActivity(activity);
        return ResponseEntity.ok(activityEntity);
    }

    // New endpoint to get all activities
    @GetMapping("/getAllActivities")
    public ResponseEntity<List<Activity>> getAllActivities() {
        List<Activity> activities = activityService.getAllActivities();
        return ResponseEntity.ok(activities);
    }

    // New endpoint to get a activity by ID
    @SuppressWarnings("unused")
	@GetMapping("/getActivity/{activityId}")
    public ResponseEntity<Activity> getActivityById(@PathVariable int activityId) {
    	try
    	{
	    	if (Objects.isNull(activityId)) {
				throw new IllegalArgumentException("No Activity Id Present");
			}
	    	return ResponseEntity.ok(activityService.getActivityById(activityId));
		} catch (Exception ex) {
			// TODO: handle exception
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
		}
    }
    
    // New endpoint to delete a activity by ID
    @SuppressWarnings("unused")
	@DeleteMapping("/deleteActivity/{activityId}")
    public ResponseEntity<Void> deleteActivity(@PathVariable int activityId) {
        try {
        	if (Objects.isNull(activityId)) {
    			throw new IllegalArgumentException("No Activity Id Present");
    		}
            activityService.deleteActivityById(activityId);
            return ResponseEntity.noContent().build(); // Return no content on successful deletion
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }
}
