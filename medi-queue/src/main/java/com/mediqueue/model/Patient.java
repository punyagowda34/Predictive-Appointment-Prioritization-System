package com.mediqueue.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "patient_id")
    private Long patientId;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "dob")
    private LocalDate dob;
    
    @Column(name = "age")
    private Integer age;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "phone")
    private String phone;
    
    @Column(name = "address")
    private String address;
    
    @Column(name = "emergency_contact")
    private String emergencyContact;
    
    @Column(name = "emergency_phone")
    private String emergencyPhone;
    
    @Column(name = "has_chronic_disease")
    private Boolean hasChronicDisease = false;
    
    @Column(name = "chronic_conditions")
    private String chronicConditions;
    
    @Column(name = "medical_notes")
    private String medicalNotes;
    
    @Column(name = "registration_date")
    private LocalDate registrationDate;
    
    @Column(name = "last_visit")
    private LocalDate lastVisit;

    // Constructors
    public Patient() {}

    public Patient(String name, LocalDate dob, Integer age, String email, String phone, 
                   String address, LocalDate registrationDate) {
        this.name = name;
        this.dob = dob;
        this.age = age;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.registrationDate = registrationDate != null ? registrationDate : LocalDate.now();
    }

    // Getters and Setters
    public Long getPatientId() { return patientId; }
    public void setPatientId(Long patientId) { this.patientId = patientId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }
    
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public String getEmergencyContact() { return emergencyContact; }
    public void setEmergencyContact(String emergencyContact) { this.emergencyContact = emergencyContact; }
    
    public String getEmergencyPhone() { return emergencyPhone; }
    public void setEmergencyPhone(String emergencyPhone) { this.emergencyPhone = emergencyPhone; }
    
    public Boolean getHasChronicDisease() { return hasChronicDisease; }
    public void setHasChronicDisease(Boolean hasChronicDisease) { this.hasChronicDisease = hasChronicDisease; }
    
    public String getChronicConditions() { return chronicConditions; }
    public void setChronicConditions(String chronicConditions) { this.chronicConditions = chronicConditions; }
    
    public String getMedicalNotes() { return medicalNotes; }
    public void setMedicalNotes(String medicalNotes) { this.medicalNotes = medicalNotes; }
    
    public LocalDate getRegistrationDate() { return registrationDate; }
    public void setRegistrationDate(LocalDate registrationDate) { this.registrationDate = registrationDate; }
    
    public LocalDate getLastVisit() { return lastVisit; }
    public void setLastVisit(LocalDate lastVisit) { this.lastVisit = lastVisit; }
}