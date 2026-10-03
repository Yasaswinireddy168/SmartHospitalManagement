package com.example.patient_service.controller;

import com.example.patient_service.entity.Patient;
import com.example.patient_service.service.PatientService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "http://localhost:5173")
public class PatientController {

    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @PostMapping
    public Patient addPatient(@RequestBody Patient patient) {
        return patientService.addPatient(patient);
    }

    @PostMapping("/login")
    public ResponseEntity<Patient> login(@RequestBody LoginRequest request) {

        try {
            Patient patient =
                    patientService.login(request.getPhone(), request.getPassword());

            return ResponseEntity.ok(patient);

        } catch (RuntimeException e) {
            return ResponseEntity.status(401).build();
        }
    }

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientService.getAllPatients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        return patientService.getPatientById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public Patient updatePatient(
            @PathVariable Long id,
            @RequestBody Patient patient) {

        return patientService.updatePatient(id, patient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePatient(@PathVariable Long id) {

        patientService.deletePatient(id);

        return ResponseEntity.ok("Patient deleted successfully");
    } 
    @PutMapping("/{id}/change-password")
public ResponseEntity<?> changePassword(
        @PathVariable Long id,
        @RequestBody ChangePasswordRequest request) {

    try {
        patientService.changePassword(
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