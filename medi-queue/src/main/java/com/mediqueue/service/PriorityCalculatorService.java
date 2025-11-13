package com.mediqueue.service;

import com.mediqueue.model.Appointment;
import com.mediqueue.model.Patient;
import com.mediqueue.model.UrgencyLevel;
import com.mediqueue.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PriorityCalculatorService {
    
    @Autowired
    private PatientRepository patientRepository;
    
    public int calculatePriorityScore(Appointment appointment) {
        int score = 0;
        Patient patient = appointment.getPatient();
        
        // Emergency cases get highest priority
        if (Boolean.TRUE.equals(appointment.getIsEmergency())) {
            score += 50;
        }
        
        // Urgency level scoring
        UrgencyLevel urgency = appointment.getUrgencyLevel();
        if (urgency != null) {
            switch (urgency) {
                case HIGH -> score += 30;
                case MEDIUM -> score += 15;
                case LOW -> score += 5;
            }
        }
        
        // Age-based scoring
        if (patient.getAge() > 60) {
            score += 20; // Senior citizen
        } else if (patient.getAge() < 10) {
            score += 10; // Child
        }
        
        // Chronic disease scoring
        if (Boolean.TRUE.equals(patient.getHasChronicDisease())) {
            score += 15;
        }
        
        // New patient scoring (first appointment)
        if (isNewPatient(patient)) {
            score += 10;
        }
        
        // Follow-up appointment
        if (Boolean.TRUE.equals(appointment.getIsFollowUp())) {
            score += 5;
        }
        
        return score;
    }
    
    private boolean isNewPatient(Patient patient) {
        Long appointmentCount = patientRepository.countAppointmentsByPatient(patient.getPatientId());
        return appointmentCount == null || appointmentCount <= 1;
    }
    
    public void updateAppointmentPriority(Appointment appointment) {
        int newScore = calculatePriorityScore(appointment);
        appointment.setPriorityScore(newScore);
    }
}