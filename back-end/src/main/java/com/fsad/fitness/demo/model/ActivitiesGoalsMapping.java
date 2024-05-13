package com.fsad.fitness.demo.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@Entity
@NoArgsConstructor
@Table(name = "activities_goals_mapping")
public class ActivitiesGoalsMapping{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_goal_mapping_id")
    private Integer activityGoalMappingId;
    
    @Column(name = "activity_id")
    private Integer activityId;
    
    @Column(name = "goal_id")
    private Integer goalId;

    // Do not manually set 'created_At' and 'modified_At' fields
    @JsonProperty("createdAt")
    @Column(name = "created_At", nullable = false, insertable = false, updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @JsonProperty("modifiedAt")
    @Column(name = "modified_At", nullable = false, insertable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime modifiedAt;

	public Integer getActivityGoalMappingId() {
		return activityGoalMappingId;
	}

	public void setActivityGoalMappingId(Integer activityGoalMappingId) {
		this.activityGoalMappingId = activityGoalMappingId;
	}

	public Integer getActivityId() {
		return activityId;
	}

	public void setActivityId(Integer activityId) {
		this.activityId = activityId;
	}

	public Integer getGoalId() {
		return goalId;
	}

	public void setGoalId(Integer goalId) {
		this.goalId = goalId;
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
