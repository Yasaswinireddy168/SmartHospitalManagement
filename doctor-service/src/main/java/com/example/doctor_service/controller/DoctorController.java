package com.example.doctor_service.controller;

import com.example.doctor_service.entity.Doctor;
import com.example.doctor_service.service.DoctorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doctors")
public class DoctorController {

    private final DoctorService doctorService;

    public DoctorController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    // Get all doctors
    @GetMapping
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }

    // Get doctor by ID
    @GetMapping("/{id}")
    public Doctor getDoctorById(@PathVariable Long id) {

        return doctorService.getDoctorById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found"));
    }

    // Add a doctor
    @PostMapping
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return doctorService.addDoctor(doctor);
    }

    // Update doctor availability
    @PutMapping("/{id}/availability")
    public Doctor updateAvailability(
            @PathVariable Long id,
            @RequestParam boolean available) {

        return doctorService.updateAvailability(id, available);
    }

    // Check doctor availability
    @GetMapping("/{id}/availability")
    public boolean checkAvailability(@PathVariable Long id) {

        Doctor doctor = doctorService.getDoctorById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found"));

        return doctor.isAvailable();
    }
}