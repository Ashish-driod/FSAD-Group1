package com.fsad.fitness.demo.repository;

import com.fsad.fitness.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Integer> {
}

