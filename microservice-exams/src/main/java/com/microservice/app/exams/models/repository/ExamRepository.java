package com.microservice.app.exams.models.repository;

import org.springframework.data.repository.CrudRepository;

import com.microservice.commons.exams.models.entity.Exam;

public interface ExamRepository extends CrudRepository<Exam, Long>{

}
