package com.example.billing_service.repository;

import com.example.billing_service.entity.Billing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BillingRepository extends JpaRepository<Billing, Long> {

    Optional<Billing> findByAppointmentId(Long appointmentId);
}