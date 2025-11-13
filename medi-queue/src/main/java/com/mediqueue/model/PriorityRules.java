package com.mediqueue.model;

import jakarta.persistence.*;

@Entity
@Table(name = "priority_rules")
public class PriorityRules {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rule_id")
    private Long ruleId;
    
    @Column(name = "condition_type")
    private String conditionType;
    
    @Column(name = "condition_value")
    private String conditionValue;
    
    @Column(name = "priority_score")
    private Integer priorityScore;
    
    @Column(name = "description")
    private String description;

    // Constructors, getters and setters
    public PriorityRules() {}

    public PriorityRules(String conditionType, String conditionValue, Integer priorityScore, String description) {
        this.conditionType = conditionType;
        this.conditionValue = conditionValue;
        this.priorityScore = priorityScore;
        this.description = description;
    }

    public Long getRuleId() { return ruleId; }
    public void setRuleId(Long ruleId) { this.ruleId = ruleId; }
    
    public String getConditionType() { return conditionType; }
    public void setConditionType(String conditionType) { this.conditionType = conditionType; }
    
    public String getConditionValue() { return conditionValue; }
    public void setConditionValue(String conditionValue) { this.conditionValue = conditionValue; }
    
    public Integer getPriorityScore() { return priorityScore; }
    public void setPriorityScore(Integer priorityScore) { this.priorityScore = priorityScore; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}