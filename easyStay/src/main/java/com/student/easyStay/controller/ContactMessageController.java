package com.student.easyStay.controller;

import com.student.easyStay.model.ContactMessage;
import com.student.easyStay.repository.ContactMessageRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin/messages")
@CrossOrigin(origins = "*")
public class ContactMessageController {

    private final ContactMessageRepository repo;

    public ContactMessageController(ContactMessageRepository repo) {
        this.repo = repo;
    }

    // 👉 Get all messages (sorted newest first)
    @GetMapping
    public ResponseEntity<?> getAllMessages() {
        List<ContactMessage> list = repo.findAll();
        list.sort(Comparator.comparing(ContactMessage::getCreatedAt).reversed());
        return ResponseEntity.ok(list);
    }

    // 👉 Get one message (FIXED)
    @GetMapping("/{id}")
    public ResponseEntity<?> getMessage(@PathVariable Long id) {
        Optional<ContactMessage> msg = repo.findById(id);

        if (msg.isEmpty()) {
            return ResponseEntity.badRequest().body("Message not found");
        }

        return ResponseEntity.ok(msg.get());
    }

    // 👉 Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMessage(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            return ResponseEntity.badRequest().body("Message not found");
        }
        repo.deleteById(id);
        return ResponseEntity.ok("Deleted successfully");
    }

    // 👉 Mark as read
    @PutMapping("/{id}/read")
    public ResponseEntity<?> markRead(@PathVariable Long id) {
        Optional<ContactMessage> msgOpt = repo.findById(id);
        if (msgOpt.isEmpty()) return ResponseEntity.badRequest().body("Message not found");

        ContactMessage msg = msgOpt.get();
        msg.setRead(true);
        repo.save(msg);

        return ResponseEntity.ok("Marked as read");
    }

    // 👉 Mark as unread
    @PutMapping("/{id}/unread")
    public ResponseEntity<?> markUnread(@PathVariable Long id) {
        Optional<ContactMessage> msgOpt = repo.findById(id);
        if (msgOpt.isEmpty()) return ResponseEntity.badRequest().body("Message not found");

        ContactMessage msg = msgOpt.get();
        msg.setRead(false);
        repo.save(msg);

        return ResponseEntity.ok("Marked as unread");
    }
}
