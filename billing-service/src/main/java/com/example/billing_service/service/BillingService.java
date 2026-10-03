package com.example.billing_service.service;

import com.example.billing_service.entity.Billing;
import com.example.billing_service.repository.BillingRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BillingService {

    private final BillingRepository billingRepository;

    public BillingService(BillingRepository billingRepository) {
        this.billingRepository = billingRepository;
    }

    public Billing createBill(Billing billing) {

        billing.setConsultationFee(500);
        billing.setTotalAmount(500);
        billing.setPaymentStatus("PENDING");

        return billingRepository.save(billing);
    }

    public List<Billing> getAllBills() {
        return billingRepository.findAll();
    }

    public Optional<Billing> getBillById(Long id) {
        return billingRepository.findById(id);
    }

    public Optional<Billing> getBillByAppointmentId(Long appointmentId) {
        return billingRepository.findByAppointmentId(appointmentId);
    }

    public Billing updatePaymentStatus(Long id, String status) {

        Billing billing = billingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Billing record not found"));

        billing.setPaymentStatus(status);

        return billingRepository.save(billing);
    }
}