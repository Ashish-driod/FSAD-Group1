package com.fsad.fitness.demo.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    private String id;

    @Column(name = "username", nullable = false)
    private String username;

}
