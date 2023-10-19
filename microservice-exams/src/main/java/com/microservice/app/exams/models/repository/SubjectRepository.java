package com.microservice.app.exams.models.repository;

import org.springframework.data.repository.CrudRepository;

import com.microservice.commons.exams.models.entity.Subject;

public interface SubjectRepository extends CrudRepository<Subject, Long>{

}
