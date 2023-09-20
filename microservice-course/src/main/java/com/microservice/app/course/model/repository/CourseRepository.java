package com.microservice.app.course.model.repository;

import org.springframework.data.repository.CrudRepository;

import com.microservice.app.course.model.entity.Course;

public interface CourseRepository extends CrudRepository<Course, Long>{

}
