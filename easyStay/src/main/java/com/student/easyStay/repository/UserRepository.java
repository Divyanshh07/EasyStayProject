package com.student.easyStay.repository;

import com.student.easyStay.model.Role;
import com.student.easyStay.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email
    Optional<User> findByEmail(String email);

    // Check if email already exists
    boolean existsByEmail(String email);

    // Get users by ROLE (ADMIN, USER, SELLER)
    List<User> findByRole(Role role);

    // Search by name (Admin)
    List<User> findByNameContainingIgnoreCase(String name);

    // Count users by role
    long countByRole(Role role);

    // Get latest 10 users
    List<User> findTop10ByOrderByIdDesc();
}
