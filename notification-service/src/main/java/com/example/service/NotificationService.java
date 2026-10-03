package com.example.notification_service.service;

import com.example.notification_service.entity.Notification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {

    private final List<Notification> notifications = new ArrayList<>();

    private Long nextId = 1L;

    public Notification createNotification(
            Long patientId,
            String message,
            String type) {

        Notification notification = new Notification();

        notification.setId(nextId++);
        notification.setPatientId(patientId);
        notification.setMessage(message);
        notification.setType(type);
        notification.setStatus("UNREAD");
        notification.setCreatedAt(
                LocalDateTime.now().toString()
        );

        notifications.add(notification);

        return notification;
    }

    public List<Notification> getAllNotifications() {
        return notifications;
    }

    public List<Notification> getPatientNotifications(
            Long patientId) {

        return notifications.stream()
                .filter(notification ->
                        notification.getPatientId().equals(patientId))
                .toList();
    }

    public void markAsRead(Long id) {

        notifications.stream()
                .filter(notification ->
                        notification.getId().equals(id))
                .findFirst()
                .ifPresent(notification ->
                        notification.setStatus("READ"));
    }
}