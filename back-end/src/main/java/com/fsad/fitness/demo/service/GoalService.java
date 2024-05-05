package com.fsad.fitness.demo.service;


import com.fsad.fitness.demo.model.Goal;
import com.fsad.fitness.demo.repository.GoalRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoalService {

    @Autowired
    private GoalRepository goalRepository;



    @Transactional
    public Goal addGoal(Goal goal) {
        return goalRepository.save(goal);
    }

    public List<Goal> getAllGoals() {
        return goalRepository.findAll();
    }

    public Optional<Goal> getGoalById(int goalId) {
        return goalRepository.findById(goalId);
    }

    @Transactional
    public void deleteGoalById(int goalId) {
        Optional<Goal> goal = goalRepository.findById(goalId);
        if (goal.isPresent()) {
            goalRepository.deleteById(goalId);
        } else {
            throw new IllegalArgumentException("Goal not found");
        }
    }
}
