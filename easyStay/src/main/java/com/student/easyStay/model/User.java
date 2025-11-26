package com.student.easyStay.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role; // USER, SELLER, ADMIN

    // 🆕 Added Seller Phone Number
    @Column(length = 15)
    private String sellerPhone;

    // 🆕 Added Seller Address
    @Column(length = 255)
    private String sellerAddress;

    private LocalDateTime createdAt = LocalDateTime.now();

    private boolean active = true; // for account enable/disable
}
