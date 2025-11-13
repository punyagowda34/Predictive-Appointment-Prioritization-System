package com.mediqueue.repository;

import com.mediqueue.model.PriorityRules;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriorityRulesRepository extends JpaRepository<PriorityRules, Long> {
}