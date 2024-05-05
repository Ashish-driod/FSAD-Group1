package com.fsad.fitness.demo.repository;

import com.fsad.fitness.demo.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Integer> {
    // Additional query methods can be added here if needed
}