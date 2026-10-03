package com.example.doctor_service.repository;

import com.example.doctor_service.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findByPhone(String phone);

    boolean existsByPhone(String phone);
}