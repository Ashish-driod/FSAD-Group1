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
    // @GetMapping("/getAllGoal")
    // public ResponseEntity<List<Goal>> getAllGoals() {
    //     List<Goal> goals = goalService.getAllGoals();
    //     return ResponseEntity.ok(goals);
    // }

    @GetMapping("/getAllGoal")
    public ResponseEntity<List<Goal>> getAllGoals(@RequestParam("userId") String userId) {
     List<Goal> goals = goalService.getAllGoalsByUserId(userId);
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
    @SuppressWarnings("unused")
	@Transactional
    @PostMapping("/addActivity/{goalId}")
    public ResponseEntity<Activity> addActivity(@RequestBody Activity activity, @PathVariable Integer goalId) {
    	try
    	{
	    	if (Objects.isNull(goalId)) {
				throw new IllegalArgumentException("Goal Id Present in Path");
			}
	        Activity activityEntity = activityService.addActivity(activity, goalId);
	        return ResponseEntity.ok(activityEntity);
    	} catch (Exception ex) {
			// TODO: handle exception
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
		}
    }

    // New endpoint to get all activities
    @GetMapping("/getAllActivities/{goalId}")
    public ResponseEntity<List<Activity>> getAllActivities( @PathVariable Integer goalId) {
    	try
    	{
	    	if (Objects.isNull(goalId)) {
				throw new IllegalArgumentException("Goal Id Present in Path");
			}
	        List<Activity> activities = activityService.getAllActivities(goalId);
	        return ResponseEntity.ok(activities);
    	} catch (Exception ex) {
			// TODO: handle exception
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
		}
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
    public ResponseEntity<Void> deleteActivityById(@PathVariable Integer activityId) {
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
    
 // New endpoint to delete a activity by ID
    @SuppressWarnings("unused")
	@DeleteMapping("/deleteActivity/{goalId}")
    public ResponseEntity<Void> deleteActivityByGoalId(@PathVariable Integer goalId) {
        try {
        	if (Objects.isNull(goalId)) {
    			throw new IllegalArgumentException("No Goal Id Present");
    		}
            activityService.deleteActivityByGoalId(goalId);
            return ResponseEntity.noContent().build(); // Return no content on successful deletion
        } catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
        }
    }
}
