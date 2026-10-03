package com.example.doctor_service.controller;

import com.example.doctor_service.entity.Doctor;
import com.example.doctor_service.service.DoctorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/doctors")
@CrossOrigin(origins = "http://localhost:5173")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable Long id) {
        return doctorService.getDoctorById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    @PostMapping
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return doctorService.addDoctor(doctor);
    }

    @PostMapping("/login")
    public ResponseEntity<Doctor> login(
            @RequestBody LoginRequest request) {

        try {
            Doctor doctor =
                    doctorService.login(
                            request.getPhone(),
                            request.getPassword()
                    );

            return ResponseEntity.ok(doctor);

        } catch (RuntimeException e) {
            return ResponseEntity.status(401).build();
        }
    }

    @PutMapping("/{id}/change-password")
public ResponseEntity<?> changePassword(
        @PathVariable Long id,
        @RequestBody ChangePasswordRequest request) {

    try {
        doctorService.changePassword(
                id,
                request.getCurrentPassword(),
                request.getNewPassword()
        );

        return ResponseEntity.ok(
                Map.of("message", "Password changed successfully")
        );

    } catch (RuntimeException e) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of("message", e.getMessage()));
    }
}

public static class ChangePasswordRequest {

    private String currentPassword;
    private String newPassword;

    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}

    @GetMapping("/{id}/availability")
    public boolean checkAvailability(@PathVariable Long id) {

        Doctor doctor = doctorService.getDoctorById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        return doctor.isAvailable();
    }

    public static class LoginRequest {

        private String phone;
        private String password;

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}