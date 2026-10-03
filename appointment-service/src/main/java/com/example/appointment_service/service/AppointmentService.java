package com.example.appointment_service.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.example.appointment_service.client.NotificationClient;
import com.example.appointment_service.client.DoctorClient;
import com.example.appointment_service.client.PatientClient;
import com.example.appointment_service.entity.Appointment;
import com.example.appointment_service.repository.AppointmentRepository;

import org.springframework.stereotype.Service;

@Service
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final PatientClient patientClient;
    private final DoctorClient doctorClient;
    private final NotificationClient notificationClient;

    public AppointmentService(
            AppointmentRepository appointmentRepository,
            PatientClient patientClient,
            DoctorClient doctorClient,
            NotificationClient notificationClient) {

        this.appointmentRepository = appointmentRepository;
        this.patientClient = patientClient;
        this.doctorClient = doctorClient;
        this.notificationClient = notificationClient;
    }


    // Book a new appointment
    public Appointment bookAppointment(Appointment appointment) {

        // Check whether patient exists
        patientClient.getPatientById(
                appointment.getPatientId()
        );

        // Check whether doctor exists
        doctorClient.getDoctorById(
                appointment.getDoctorId()
        );

        // Check whether doctor is available
        boolean available =
                doctorClient.checkAvailability(
                        appointment.getDoctorId()
                );

        if (!available) {
            throw new RuntimeException(
                    "Doctor is currently unavailable"
            );
        }

        // Check whether doctor already has an appointment
        boolean alreadyBooked =
                appointmentRepository
                        .existsByDoctorIdAndAppointmentDateAndAppointmentTimeAndStatus(
                                appointment.getDoctorId(),
                                appointment.getAppointmentDate(),
                                appointment.getAppointmentTime(),
                                "BOOKED"
                        );

        if (alreadyBooked) {
            throw new RuntimeException(
                    "Doctor already has an appointment at this time"
            );
        }

        // Set status automatically
        appointment.setStatus("BOOKED");

        // Save appointment
        Appointment savedAppointment =
                appointmentRepository.save(appointment);

        // Create appointment notification
        String message =
                "Appointment with Doctor ID "
                + appointment.getDoctorId()
                + " has been successfully booked.";

        notificationClient.createNotification(
                appointment.getPatientId(),
                message,
                "APPOINTMENT"
        );

        return savedAppointment;
    }


    // Get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }


    // Get appointment by ID
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }


    // Update / Reschedule appointment
    public Appointment updateAppointment(
            Long id,
            Appointment appointment) {

        // Check whether appointment exists
        Appointment existingAppointment =
                appointmentRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Appointment not found"
                                ));

        // Check whether patient exists
        patientClient.getPatientById(
                appointment.getPatientId()
        );

        // Check whether doctor exists
        doctorClient.getDoctorById(
                appointment.getDoctorId()
        );

        // Check whether doctor is available
        boolean available =
                doctorClient.checkAvailability(
                        appointment.getDoctorId()
                );

        if (!available) {
            throw new RuntimeException(
                    "Doctor is currently unavailable"
            );
        }

        // Check whether another appointment already
        // uses the same doctor, date and time
        boolean alreadyBooked =
                appointmentRepository
                        .existsByDoctorIdAndAppointmentDateAndAppointmentTimeAndStatus(
                                appointment.getDoctorId(),
                                appointment.getAppointmentDate(),
                                appointment.getAppointmentTime(),
                                "BOOKED"
                        );

        // Check whether the appointment is keeping
        // its own existing doctor, date and time
        boolean sameAppointmentSlot =
                existingAppointment.getDoctorId()
                        .equals(appointment.getDoctorId())
                &&
                existingAppointment.getAppointmentDate()
                        .equals(appointment.getAppointmentDate())
                &&
                existingAppointment.getAppointmentTime()
                        .equals(appointment.getAppointmentTime());

        // If another appointment already occupies
        // the requested slot, reject the update
        if (alreadyBooked && !sameAppointmentSlot) {
            throw new RuntimeException(
                    "Doctor already has an appointment at this time"
            );
        }

        // Update appointment details
        existingAppointment.setPatientId(
                appointment.getPatientId()
        );

        existingAppointment.setDoctorId(
                appointment.getDoctorId()
        );

        existingAppointment.setAppointmentDate(
                appointment.getAppointmentDate()
        );

        existingAppointment.setAppointmentTime(
                appointment.getAppointmentTime()
        );

        // Keep the updated appointment as BOOKED
        existingAppointment.setStatus(appointment.getStatus());

        return appointmentRepository.save(
                existingAppointment
        );
    }


    // Cancel appointment
    public void cancelAppointment(Long id) {

    Appointment appointment =
            appointmentRepository.findById(id)
                    .orElseThrow(() ->
                            new RuntimeException("Appointment not found"));

    appointment.setStatus("CANCELLED");

    appointmentRepository.save(appointment);

    String message =
            "Your appointment with Doctor ID "
            + appointment.getDoctorId()
            + " on "
            + appointment.getAppointmentDate()
            + " at "
            + appointment.getAppointmentTime()
            + " has been cancelled by the doctor.";

    notificationClient.createNotification(
            appointment.getPatientId(),
            message,
            "APPOINTMENT_CANCELLED"
    );
}


    // Get all appointments of a doctor
    // for a particular date
    public List<Appointment> getDoctorAppointments(
            Long doctorId,
            LocalDate date) {

        return appointmentRepository
                .findByDoctorIdAndAppointmentDate(
                        doctorId,
                        date
                );
    }


    // Get number of BOOKED appointments
    // for a doctor on a particular date
    public long getDoctorAppointmentCount(
            Long doctorId,
            LocalDate date) {

        return appointmentRepository
                .countByDoctorIdAndAppointmentDateAndStatus(
                        doctorId,
                        date,
                        "BOOKED"
                );
    }
}