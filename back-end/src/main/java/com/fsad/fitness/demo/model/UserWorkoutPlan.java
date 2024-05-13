package com.fsad.fitness.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name = "UserWorkoutPlan")
public class UserWorkoutPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userWorkoutPlan_id")
    private int userWorkoutPlanId;

    @Column(name = "user_id",nullable = false)
    private String userId;

    @Column(name = "workoutPlan_id",nullable = false)
    private int workoutPlanId;

    public int getUserWorkoutPlanId() {
        return userWorkoutPlanId;
    }

    public void setUserWorkoutPlanId(int userWorkoutPlanId) {
        this.userWorkoutPlanId = userWorkoutPlanId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getWorkoutPlanId() {
        return workoutPlanId;
    }

    public void setWorkoutPlanId(int workoutPlanId) {
        this.workoutPlanId = workoutPlanId;
    }
}
