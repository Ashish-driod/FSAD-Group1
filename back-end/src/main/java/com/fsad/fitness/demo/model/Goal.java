package com.fsad.fitness.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@Entity
@NoArgsConstructor
@Table(name = "Goals")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goal_id", nullable = false)
    private int goalId;

    @Column(name = "user_id", nullable = false)
    private String userId;


    @Column(name = "goal_type", nullable = false, length = 100)
    private String goalType;


    @Column(name = "target_value", nullable = false, precision = 10, scale = 2)
    private BigDecimal targetValue;


    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;


    @Column(name = "end_date", nullable = false)
    private LocalDate endDate;

    // Do not manually set 'created_At' and 'modified_At' fields
    @JsonProperty("createdAt")
    @Column(name = "created_At", nullable = false, insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @JsonProperty("modifiedAt")
    @Column(name = "modified_At", nullable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime modifiedAt;

    // Getters and setters


}
