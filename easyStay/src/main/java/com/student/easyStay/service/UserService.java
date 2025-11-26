package com.student.easyStay.service;

import com.student.easyStay.model.Role;
import com.student.easyStay.model.User;
import com.student.easyStay.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    // -------------------- REGISTER USER --------------------
    public User register(User user) {

        // Encode password before saving
        user.setPassword(encoder.encode(user.getPassword()));

        return userRepository.save(user);
    }


    // -------------------- LOGIN USER --------------------
    public Optional<User> login(String email, String password) {

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent() && encoder.matches(password, userOpt.get().getPassword())) {
            return userOpt;
        }

        return Optional.empty();
    }


    // -------------------- CHECK EMAIL EXIST --------------------
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }


    // -------------------- GET ALL USERS --------------------
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    // -------------------- GET USER BY ID --------------------
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // -------------------- GET USER BY EMAIL (Required for PropertyDetails) --------------------
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    // -------------------- UPDATE USER BY ID --------------------
    public Optional<User> updateUser(Long id, User updatedUser) {

        return userRepository.findById(id).map(existingUser -> {

            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setRole(updatedUser.getRole());

            // ✔ Seller fields update (NEW)
            if (updatedUser.getSellerPhone() != null) {
                existingUser.setSellerPhone(updatedUser.getSellerPhone());
            }
            if (updatedUser.getSellerAddress() != null) {
                existingUser.setSellerAddress(updatedUser.getSellerAddress());
            }

            // ✔ Password update logic
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isBlank()) {

                if (!updatedUser.getPassword().startsWith("$2a$")) {
                    existingUser.setPassword(encoder.encode(updatedUser.getPassword()));
                } else {
                    existingUser.setPassword(updatedUser.getPassword());
                }
            }

            return userRepository.save(existingUser);
        });
    }


    // -------------------- DELETE USER --------------------
    public boolean deleteUser(Long id) {

        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }

        return false;
    }


    // -------------------- GET USERS BY ROLE (Enum Safe) --------------------
    public List<User> getUsersByRole(String role) {
        return userRepository.findByRole(Role.valueOf(role));
    }


    // -------------------- SEARCH USERS BY NAME --------------------
    public List<User> searchUsersByName(String name) {
        return userRepository.findByNameContainingIgnoreCase(name);
    }


    // -------------------- COUNT USERS BY ROLE --------------------
    public long countUsersByRole(String role) {
        return userRepository.countByRole(Role.valueOf(role));
    }


    // -------------------- GET RECENT USERS --------------------
    public List<User> getRecentUsers() {
        return userRepository.findTop10ByOrderByIdDesc();
    }


    // -------------------- SAVE USER (used for Seller Update) --------------------
    public User save(User user) {
        return userRepository.save(user);
    }
}
