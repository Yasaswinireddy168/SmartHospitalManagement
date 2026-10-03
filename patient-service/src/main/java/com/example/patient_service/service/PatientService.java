package com.example.patient_service.service;

import com.example.patient_service.entity.Patient;
import com.example.patient_service.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientService(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }

    public Patient addPatient(Patient patient) {

        if (patientRepository.existsByPhone(patient.getPhone())) {
            throw new RuntimeException("Phone number already registered");
        }

        return patientRepository.save(patient);
    }

    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    public Optional<Patient> getPatientById(Long id) {
        return patientRepository.findById(id);
    }

    public Patient updatePatient(Long id, Patient patient) {

        Patient existingPatient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        existingPatient.setName(patient.getName());
        existingPatient.setAge(patient.getAge());
        existingPatient.setGender(patient.getGender());
        existingPatient.setPhone(patient.getPhone());
        existingPatient.setEmail(patient.getEmail());
        existingPatient.setAddress(patient.getAddress());

        return patientRepository.save(existingPatient);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
    public void changePassword(
        Long id,
        String currentPassword,
        String newPassword) {

    Patient patient = patientRepository.findById(id)
            .orElseThrow(() ->
                    new RuntimeException("Patient not found"));
         if (patient.getPassword() == null ||
            patient.getPassword().isEmpty()) {
        throw new RuntimeException("No password is set for this patient. Please register again or set a password.");
    }

    if (!patient.getPassword().equals(currentPassword)) {
        throw new RuntimeException("Current password is incorrect");
    }

    if (newPassword == null || newPassword.trim().isEmpty()) {
        throw new RuntimeException("New password cannot be empty");
    }

    patient.setPassword(newPassword);

    patientRepository.save(patient);
}

    public Patient login(String phone, String password) {

        Patient patient = patientRepository.findByPhone(phone)
                .orElseThrow(() ->
                        new RuntimeException("Patient not found"));

        if (!patient.getPassword().equals(password)) {
            throw new RuntimeException("Incorrect password");
        }

        return patient;
    }
}