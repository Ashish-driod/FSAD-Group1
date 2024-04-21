package com.fsad.fitness.demo.controller;

import com.fsad.fitness.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.fsad.fitness.demo.repository.UserRepository;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/fitness-tracker")
public class FitnessTrackerController {

    @Autowired
    UserRepository repository;

    @PostMapping("/signup")
    public User createNewUser(@RequestBody User user){
        User checkUser = repository.findByUsername(user.getUsername());
        if (checkUser == null) {
            repository.save(user);
            return user;
        }
        else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST , "Username already exists");
        }
    }

    @PostMapping("/signin")
    public Boolean authenticateUser(@RequestBody User user) {
        User checkUser = repository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
        return checkUser != null;
    }

    @GetMapping("/testing")
    public String testingController() {
        return "Testing successful";
    }
}
