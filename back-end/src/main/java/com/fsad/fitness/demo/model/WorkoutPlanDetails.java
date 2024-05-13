package com.fsad.fitness.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@Getter
@Setter
public class WorkoutPlanDetails {

    private int workoutPlanId;

    private String workoutPlanName;

    private String workoutPlanDescription;

    List<Exercise> exerciseList = new ArrayList<>();



}
