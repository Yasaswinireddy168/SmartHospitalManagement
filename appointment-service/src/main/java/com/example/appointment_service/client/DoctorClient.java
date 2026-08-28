package com.example.appointment_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "doctor-service")
public interface DoctorClient {

    @GetMapping("/doctors/{id}")
    Object getDoctorById(@PathVariable("id") Long id);

    @GetMapping("/doctors/{id}/availability")
    boolean checkAvailability(@PathVariable("id") Long id);
}