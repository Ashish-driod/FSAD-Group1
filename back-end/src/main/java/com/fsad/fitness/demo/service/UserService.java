package com.fsad.fitness.demo.service;

import com.fsad.fitness.demo.model.User;
import com.fsad.fitness.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    @Transactional
    public User save(User user) {
        return userRepository.save(user);
    }

}
