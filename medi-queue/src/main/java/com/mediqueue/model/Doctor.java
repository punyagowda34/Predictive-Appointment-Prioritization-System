package com.mediqueue.model;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id")
    private Long doctorId;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "specialization", nullable = false)
    private String specialization;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "phone")
    private String phone;
    
    @Column(name = "is_available")
    private Boolean isAvailable = true;

    // Constructors
    public Doctor() {}

    public Doctor(String name, String specialization, String email, String phone, Boolean isAvailable) {
        this.name = name;
        this.specialization = specialization;
        this.email = email;
        this.phone = phone;
        this.isAvailable = isAvailable != null ? isAvailable : true;
    }

    // Getters and Setters
    public Long getDoctorId() { return doctorId; }
    public void setDoctorId(Long doctorId) { this.doctorId = doctorId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public Boolean getIsAvailable() { return isAvailable; }
    public void setIsAvailable(Boolean isAvailable) { this.isAvailable = isAvailable; }
}