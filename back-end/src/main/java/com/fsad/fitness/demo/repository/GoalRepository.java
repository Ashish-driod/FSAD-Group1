package com.fsad.fitness.demo.repository;

import com.fsad.fitness.demo.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, Integer> {
    // Additional query methods can be added here if needed
}