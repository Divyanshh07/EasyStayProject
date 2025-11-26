package com.student.easyStay.controller;

import com.student.easyStay.model.User;
import com.student.easyStay.security.JwtUtil;
import com.student.easyStay.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // --------------------------------------------
    // SIGNUP
    // --------------------------------------------
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {

        if (userService.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
        }

        User savedUser = userService.register(user);

        return ResponseEntity.ok(Map.of(
                "message", "Signup successful",
                "user", savedUser
        ));
    }


    // --------------------------------------------
    // LOGIN
    // --------------------------------------------
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> data) {

        String email = data.get("email");
        String password = data.get("password");

        Optional<User> user = userService.login(email, password);

        if (user.isPresent()) {

            String token = jwtUtil.generateToken(
                    user.get().getEmail(),
                    user.get().getRole().name()
            );

            return ResponseEntity.ok(Map.of(
                    "message", "Login successful",
                    "token", token,
                    "user", user.get()
            ));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Invalid email or password"));
    }


    // --------------------------------------------
    // GET ALL USERS
    // --------------------------------------------
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }


    // --------------------------------------------
    // GET USER BY ID
    // --------------------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);

        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        }

        return ResponseEntity.status(404).body(Map.of("error", "User not found"));
    }


    // --------------------------------------------
    // UPDATE GENERAL USER
    // --------------------------------------------
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @RequestBody User updatedUserData
    ) {
        Optional<User> updatedUser = userService.updateUser(id, updatedUserData);

        if (updatedUser.isPresent()) {
            return ResponseEntity.ok(Map.of(
                    "message", "User updated successfully",
                    "user", updatedUser.get()
            ));
        }

        return ResponseEntity.status(404).body(Map.of("error", "User not found"));
    }


    // --------------------------------------------
    // DELETE USER
    // --------------------------------------------
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);

        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
        }

        return ResponseEntity.status(404).body(Map.of("error", "User not found"));
    }


    // --------------------------------------------
    // CHECK EMAIL EXISTS
    // --------------------------------------------
    @GetMapping("/exists")
    public ResponseEntity<?> checkEmailExists(@RequestParam String email) {
        boolean exists = userService.existsByEmail(email);

        return ResponseEntity.ok(Map.of(
                "email", email,
                "exists", exists
        ));
    }


    // --------------------------------------------
    // GET USERS BY ROLE (ADMIN, USER, SELLER)
    // --------------------------------------------
    @GetMapping("/role/{role}")
    public ResponseEntity<?> getUsersByRole(@PathVariable String role) {
        List<User> users = userService.getUsersByRole(role.toUpperCase());
        return ResponseEntity.ok(users);
    }


    // =====================================================================
    // 🆕 NEW: UPDATE SELLER PROFILE (ADDRESS + PHONE + NAME)
    // =====================================================================
    @PutMapping("/seller/update/{id}")
    public ResponseEntity<?> updateSeller(
            @PathVariable Long id,
            @RequestBody Map<String, String> data
    ) {

        Optional<User> userOpt = userService.getUserById(id);

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body(Map.of("error", "Seller not found"));
        }

        User user = userOpt.get();

        // Only SELLER allowed
        if (!user.getRole().name().equals("SELLER")) {
            return ResponseEntity.status(403).body(Map.of("error", "User is not a seller"));
        }

        // Update fields if present
        if (data.containsKey("name")) user.setName(data.get("name"));
        if (data.containsKey("sellerPhone")) user.setSellerPhone(data.get("sellerPhone"));
        if (data.containsKey("sellerAddress")) user.setSellerAddress(data.get("sellerAddress"));

        // Save changes
        User updated = userService.save(user);

        return ResponseEntity.ok(Map.of(
                "message", "Seller updated successfully",
                "seller", updated
        ));
    }
}
