package com.student.easyStay.controller;

import com.student.easyStay.model.ContactMessage;
import com.student.easyStay.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:3000",
        "https://your-production-domain.com"
})
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    // ============================
    // 👉 SEND MESSAGE (PUBLIC)
    // ============================
    @PostMapping("/send")
    public ResponseEntity<?> sendMessage(@RequestBody ContactMessage message) {

        // Validation
        if (isEmpty(message.getName()) ||
                isEmpty(message.getEmail()) ||
                isEmpty(message.getMessage())) {

            return ResponseEntity.badRequest()
                    .body("Name, email & message are required");
        }

        // Mark message unread for admin
        message.setRead(false);

        // Save message
        contactService.saveMessage(message);

        return ResponseEntity.ok("Message received successfully!");
    }

    // Utility
    private boolean isEmpty(String value) {
        return value == null || value.trim().isEmpty();
    }
}
