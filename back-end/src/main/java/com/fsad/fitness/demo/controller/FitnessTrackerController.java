package com.fsad.fitness.demo.controller;


import com.fsad.fitness.demo.model.Goal; // Import Goal model
import com.fsad.fitness.demo.repository.UserRepository;
import com.fsad.fitness.demo.service.GoalService; // Import Goal service

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fitness-tracker")
public class FitnessTrackerController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    GoalService goalService; // Add the GoalService injection


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

}
