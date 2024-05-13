package com.fsad.fitness.demo.controller;


import com.fsad.fitness.demo.model.*;
import com.fsad.fitness.demo.repository.UserRepository;
import com.fsad.fitness.demo.repository.UserWorkoutPlanRepository;
import com.fsad.fitness.demo.repository.WorkoutPlanExerciseRepository;
import com.fsad.fitness.demo.service.*;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/fitness-tracker")
public class FitnessTrackerController {

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    GoalService goalService; // Add the GoalService injection

    @Autowired
    ActivityService activityService; // Add ActivityService injection

    @Autowired
    ExerciseService exerciseService;

    @Autowired
    WorkoutPlanService workoutPlanService;

    @Autowired
    WorkoutPlanExerciseRepository workoutPlanExerciseRepository;

    @Autowired
    UserWorkoutPlanRepository userWorkoutPlanRepository;


    @PostMapping("/registerUser")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User usr = userService.save(user);
        return new ResponseEntity<>(usr, HttpStatus.OK);
    }

    @PostMapping("/mapWorkoutPlans/{workoutPlanId}")
    public ResponseEntity<String> addWorkoutPlanToUser(@RequestBody UserWorkoutPlan userWorkoutPlan, @PathVariable int workoutPlanId){
        UserWorkoutPlan newUserWorkoutPlan = new UserWorkoutPlan();
        newUserWorkoutPlan.setUserId(userWorkoutPlan.getUserId());
        newUserWorkoutPlan.setWorkoutPlanId(workoutPlanId);
        if(validateIfPlanExistsForUser(newUserWorkoutPlan)) {
            if (userWorkoutPlanRepository.save(newUserWorkoutPlan) != null) {
                return new ResponseEntity<>("Workout Plan added to profile.",HttpStatus.CREATED);
            }
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } else {
            return new ResponseEntity<>("Workout Plan already added.",HttpStatus.valueOf(500));
        }
    }

    @DeleteMapping("/deleteWorkoutPlan/{workoutPlanId}")
    public ResponseEntity<String> removeWorkoutPlanFromUser(@RequestBody UserWorkoutPlan userWorkoutPlan, @PathVariable int workoutPlanId){
        UserWorkoutPlan removeUserWorkoutPlan;
        if((removeUserWorkoutPlan = userWorkoutPlanRepository.findByUserIdAndWorkoutPlanId(userWorkoutPlan.getUserId(),workoutPlanId)) != null){
            try{
                userWorkoutPlanRepository.deleteById(removeUserWorkoutPlan.getUserWorkoutPlanId());
            }catch (Exception e){
                return new ResponseEntity<>("Delete Workout Plan failed",HttpStatus.valueOf(500));
            }

        }

        return new ResponseEntity<>(HttpStatus.valueOf(204));

    }


    private Boolean validateIfPlanExistsForUser(UserWorkoutPlan newUserWorkoutPlan){
        List<UserWorkoutPlan> list = userWorkoutPlanRepository.findByUserId(newUserWorkoutPlan.getUserId());
        if(list == null){
            return true;
        }
        for(UserWorkoutPlan userWorkoutPlan : list){
            if(userWorkoutPlan.getWorkoutPlanId() == newUserWorkoutPlan.getWorkoutPlanId())
                return false;
        }
        return true;
    }

    @GetMapping("/getWorkoutPlan")
    public ResponseEntity<List<WorkoutPlanDetails>> getWorkoutPlanByUserId(@RequestParam("userId") String userId){
        List<WorkoutPlanDetails> workoutPlanDetails = new ArrayList<>();

        List<WorkoutPlan> userWorkoutPlanList = workoutPlanService.getWorkoutPlansByUserId(userId);
        for(WorkoutPlan wP: userWorkoutPlanList){
            WorkoutPlanDetails wPD = new WorkoutPlanDetails();

            wPD.setWorkoutPlanName(wP.getName());
            wPD.setWorkoutPlanDescription(wP.getDescription());
            wPD.setWorkoutPlanId(wP.getId());

            wPD.setExerciseList(exerciseService.getAllExercisesByWorkoutPlanId(wP.getId()));
            workoutPlanDetails.add(wPD);
        }
        return ResponseEntity.ok(workoutPlanDetails);

    }


    @GetMapping("/getWorkoutPlans")
    public ResponseEntity<List<WorkoutPlanDetails>> getAllWorkoutPlanDetails(){
        List<WorkoutPlanDetails> workoutPlanDetails = new ArrayList<>();

        List<WorkoutPlan> workoutPlan = workoutPlanService.getAllWorkoutPlans();
        for(WorkoutPlan wP : workoutPlan){
            WorkoutPlanDetails wPD = new WorkoutPlanDetails();

            wPD.setWorkoutPlanName(wP.getName());
            wPD.setWorkoutPlanDescription(wP.getDescription());
            wPD.setWorkoutPlanId(wP.getId());

            wPD.setExerciseList(exerciseService.getAllExercisesByWorkoutPlanId(wP.getId()));
            workoutPlanDetails.add(wPD);
        }
        return ResponseEntity.ok(workoutPlanDetails);
    }

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
    @GetMapping("/getAllActivities/{userId}")
    public ResponseEntity<List<Activity>> getAllActivities( @PathVariable String userId) {
    	try
    	{
	    	if (Objects.isNull(userId)) {
				throw new IllegalArgumentException("Goal Id Present in Path");
			}
	        List<Activity> activities = activityService.getAllActivities(userId);
	        return ResponseEntity.ok(activities);
    	} catch (Exception ex) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage());
		}
    }

    @GetMapping("/getAllAcvt")
    public ResponseEntity<List<Activity>> getAllAcvt(@RequestParam("userId") String userId) {
        try {
            List<Activity> activities = activityService.getAllAcvtByUserId(userId);
            return ResponseEntity.ok(activities);
        }catch (Exception ex){
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
