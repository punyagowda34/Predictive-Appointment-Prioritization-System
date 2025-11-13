package com.mediqueue.service;

import com.mediqueue.model.Appointment;
import com.mediqueue.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AppointmentService {
    
    @Autowired
    private AppointmentRepository appointmentRepository;
    
    public List<Appointment> getPrioritizedQueue(Long doctorId, LocalDate date) {
        return appointmentRepository.findByDoctorDoctorIdAndAppointmentDateOrderByPriorityScoreDesc(doctorId, date);
    }
    
    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }
    
    public List<Appointment> getTodaysAppointments(Long doctorId) {
        return appointmentRepository.findByDoctorDoctorIdAndAppointmentDate(doctorId, LocalDate.now());
    }
}