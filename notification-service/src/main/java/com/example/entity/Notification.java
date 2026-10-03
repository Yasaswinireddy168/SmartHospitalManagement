package com.example.notification_service.entity;

public class Notification {

    private Long id;
    private Long patientId;
    private String message;
    private String type;
    private String status;
    private String createdAt;

    public Notification() {
    }

    public Notification(
            Long id,
            Long patientId,
            String message,
            String type,
            String status,
            String createdAt) {

        this.id = id;
        this.patientId = patientId;
        this.message = message;
        this.type = type;
        this.status = status;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}