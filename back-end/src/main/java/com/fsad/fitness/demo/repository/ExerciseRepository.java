package com.fsad.fitness.demo.repository;

import com.fsad.fitness.demo.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise,Integer> {

}
