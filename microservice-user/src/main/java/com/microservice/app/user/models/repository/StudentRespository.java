package com.microservice.app.user.models.repository;

import org.springframework.data.repository.CrudRepository;

import com.microservice.app.user.models.entity.Student;

public interface StudentRespository extends CrudRepository<Student, Long>{

}
