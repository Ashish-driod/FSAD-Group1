package com.fsad.fitness.demo.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Exercises")
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exercises_id")
    private int exercises_id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "muscle_group", nullable = false)
    private String muscle_group;

    @Column(name = "equipment_needed", nullable = false)
    private String equipment_needed;

    @Column(name = "sets", nullable = true)
    private int sets;

    @Column(name = "reps", nullable = true)
    private int reps;

    @JsonProperty("createdAt")
    @Column(name = "created_At", nullable = false, insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @JsonProperty("modifiedAt")
    @Column(name = "modified_At", nullable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime modifiedAt;

    public int getExercises_id() {
        return exercises_id;
    }

    public void setExercises_id(int exercises_id) {
        this.exercises_id = exercises_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMuscle_group() {
        return muscle_group;
    }

    public void setMuscle_group(String muscle_group) {
        this.muscle_group = muscle_group;
    }

    public String getEquipment_needed() {
        return equipment_needed;
    }

    public void setEquipment_needed(String equipment_needed) {
        this.equipment_needed = equipment_needed;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(LocalDateTime modifiedAt) {
        this.modifiedAt = modifiedAt;
    }
}
