package com.student.easyStay.service;

import com.student.easyStay.model.ContactMessage;
import com.student.easyStay.repository.ContactMessageRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private final ContactMessageRepository repository;

    public ContactService(ContactMessageRepository repository) {
        this.repository = repository;
    }

    // Save message only (NO EMAIL)
    public ContactMessage saveMessage(ContactMessage msg) {
        return repository.save(msg);
    }
}
