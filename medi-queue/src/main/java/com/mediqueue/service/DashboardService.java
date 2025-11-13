package com.mediqueue.service;

import com.mediqueue.model.Appointment;
import com.mediqueue.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class DashboardService {
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    public Map<String, Object> getDashboardStats(Long doctorId) {
        LocalDate today = LocalDate.now();
        
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalAppointments", 
            appointmentRepository.countTodayAppointments(doctorId, today));
        stats.put("highPriorityCount", 
            appointmentRepository.countHighPriorityAppointments(doctorId, today));
        
        Double avgWaitTime = appointmentRepository.calculateAverageWaitingTime(doctorId, today);
        stats.put("averageWaitingTime", avgWaitTime != null ? avgWaitTime : 0);
        
        return stats;
    }
    
    public List<Appointment> getTodaysQueue(Long doctorId) {
        return appointmentRepository.findByDoctorDoctorIdAndAppointmentDateOrderByPriorityScoreDesc(
            doctorId, LocalDate.now());
    }
    
    public Map<String, Long> getPriorityDistribution(Long doctorId) {
        LocalDate today = LocalDate.now();
        List<Appointment> appointments = getTodaysQueue(doctorId);
        
        Map<String, Long> distribution = new HashMap<>();
        distribution.put("high", appointments.stream().filter(a -> a.getPriorityScore() >= 50).count());
        distribution.put("medium", appointments.stream().filter(a -> a.getPriorityScore() >= 30 && a.getPriorityScore() < 50).count());
        distribution.put("low", appointments.stream().filter(a -> a.getPriorityScore() < 30).count());
        
        return distribution;
    }
}