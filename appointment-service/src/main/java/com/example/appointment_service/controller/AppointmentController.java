package com.example.appointment_service.controller;

import com.example.appointment_service.entity.Appointment;
import com.example.appointment_service.service.AppointmentService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/appointments")
@CrossOrigin(origins = "http://localhost:5173")

public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // Book appointment
    @PostMapping
    public Appointment bookAppointment(
            @RequestBody Appointment appointment) {

        return appointmentService.bookAppointment(appointment);
    }

    // Get all appointments
    @GetMapping
    public List<Appointment> getAllAppointments() {

        return appointmentService.getAllAppointments();
    }

    // Get appointment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(
            @PathVariable Long id) {

        return appointmentService.getAppointmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get doctor's appointments for a date
    @GetMapping("/doctor/{doctorId}/date/{date}")
    public List<Appointment> getDoctorAppointments(
            @PathVariable Long doctorId,
            @PathVariable LocalDate date) {

        return appointmentService.getDoctorAppointments(
                doctorId,
                date
        );
    }

    // Get doctor's appointment count for a date
    @GetMapping("/doctor/{doctorId}/count/{date}")
    public long getDoctorAppointmentCount(
            @PathVariable Long doctorId,
            @PathVariable LocalDate date) {

        return appointmentService.getDoctorAppointmentCount(
                doctorId,
                date
        );
    }

    // Update / Reschedule appointment
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAppointment(
            @PathVariable Long id,
            @RequestBody Appointment appointment) {

        try {

            Appointment updatedAppointment =
                    appointmentService.updateAppointment(
                            id,
                            appointment
                    );

            return ResponseEntity.ok(updatedAppointment);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of(
                            "status", HttpStatus.CONFLICT.value(),
                            "message", e.getMessage()
                    ));
        }
    }

    // Cancel appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<String> cancelAppointment(
            @PathVariable Long id) {

        appointmentService.cancelAppointment(id);

        return ResponseEntity.ok(
                "Appointment cancelled successfully"
        );
    }
}