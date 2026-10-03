package com.example.doctor_service.service;

import com.example.doctor_service.entity.Doctor;
import com.example.doctor_service.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorService(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    public Optional<Doctor> getDoctorById(Long id) {
        return doctorRepository.findById(id);
    }

    public Doctor addDoctor(Doctor doctor) {

        if (doctorRepository.existsByPhone(doctor.getPhone())) {
            throw new RuntimeException("Phone number already registered");
        }

        return doctorRepository.save(doctor);
    }

    public Doctor login(String phone, String password) {

        Doctor doctor = doctorRepository.findByPhone(phone)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found"));

        if (!doctor.getPassword().equals(password)) {
            throw new RuntimeException("Incorrect password");
        }

        return doctor;
    }

    public Doctor updateAvailability(Long id, boolean available) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found"));

        doctor.setAvailable(available);

        return doctorRepository.save(doctor);
    }

    public Doctor updateDoctor(Long id, Doctor doctor) {

        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found"));

        existingDoctor.setName(doctor.getName());
        existingDoctor.setSpecialization(doctor.getSpecialization());
        existingDoctor.setPhone(doctor.getPhone());
        existingDoctor.setEmail(doctor.getEmail());
        existingDoctor.setAvailability(doctor.getAvailability());
        existingDoctor.setAvailable(doctor.isAvailable());

        if (doctor.getPassword() != null &&
                !doctor.getPassword().isEmpty()) {

            existingDoctor.setPassword(doctor.getPassword());
        }

        return doctorRepository.save(existingDoctor);
    }

    // ================================
    // CHANGE PASSWORD
    // ================================

    public void changePassword(
            Long id,
            String currentPassword,
            String newPassword) {

        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Doctor not found"));

        if (doctor.getPassword() == null ||
                doctor.getPassword().isEmpty()) {

            throw new RuntimeException(
                    "No password is set for this doctor."
            );
        }

        if (!doctor.getPassword().equals(currentPassword)) {

            throw new RuntimeException(
                    "Current password is incorrect"
            );
        }

        if (newPassword == null ||
                newPassword.trim().isEmpty()) {

            throw new RuntimeException(
                    "New password cannot be empty"
            );
        }

        doctor.setPassword(newPassword);

        doctorRepository.save(doctor);
    }
}