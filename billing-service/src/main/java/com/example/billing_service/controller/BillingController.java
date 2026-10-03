package com.example.billing_service.controller;

import com.example.billing_service.entity.Billing;
import com.example.billing_service.service.BillingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/billing")
@CrossOrigin(origins = "http://localhost:5173")
public class BillingController {

    private final BillingService billingService;

    public BillingController(BillingService billingService) {
        this.billingService = billingService;
    }

    @PostMapping
    public Billing createBill(@RequestBody Billing billing) {
        return billingService.createBill(billing);
    }

    @GetMapping
    public List<Billing> getAllBills() {
        return billingService.getAllBills();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Billing> getBillById(@PathVariable Long id) {

        return billingService.getBillById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/appointment/{appointmentId}")
    public ResponseEntity<Billing> getBillByAppointmentId(
            @PathVariable Long appointmentId) {

        return billingService.getBillByAppointmentId(appointmentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/payment")
    public Billing updatePaymentStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        return billingService.updatePaymentStatus(id, status);
    }
}