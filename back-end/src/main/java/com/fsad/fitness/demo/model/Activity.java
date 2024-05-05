package com.fsad.fitness.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@Entity
@NoArgsConstructor
@Table(name = "Activities")
public class Activity{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "activity_id")
    private int activityId;

    @Column(name = "user_id", nullable = false)
    private String userId;


    @Column(name = "activity_type", nullable = false, length = 100)
    private String activityType;


    @Column(name = "duration", nullable = false)
    private Integer duration;


    @Column(name = "calories_burned", nullable = false)
    private Integer caloriesBurned;

    // Do not manually set 'created_At' and 'modified_At' fields
    @JsonProperty("createdAt")
    @Column(name = "created_At", nullable = false, insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @JsonProperty("modifiedAt")
    @Column(name = "modified_At", nullable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime modifiedAt;

    // Getters and setters


}
