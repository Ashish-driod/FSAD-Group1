package com.fsad.fitness.demo.repository;

import com.fsad.fitness.demo.model.Activity;
import com.fsad.fitness.demo.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {
    // Additional query methods can be added here if needed
    List<Activity> findByUserId(String userId);
}