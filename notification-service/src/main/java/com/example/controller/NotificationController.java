package com.example.notification_service.controller;

import com.example.notification_service.entity.Notification;
import com.example.notification_service.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    // Create notification
    @PostMapping
    public Notification createNotification(
            @RequestParam Long patientId,
            @RequestParam String message,
            @RequestParam String type) {

        return notificationService.createNotification(
                patientId,
                message,
                type
        );
    }

    // Get all notifications
    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    // Get notifications for a patient
    @GetMapping("/patient/{patientId}")
    public List<Notification> getPatientNotifications(
            @PathVariable Long patientId) {

        return notificationService.getPatientNotifications(
                patientId
        );
    }

    // Mark notification as read
    @PutMapping("/{id}/read")
    public String markAsRead(@PathVariable Long id) {

        notificationService.markAsRead(id);

        return "Notification marked as read";
    }
}