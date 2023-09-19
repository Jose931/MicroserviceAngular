package com.microservice.app.user.service;

import java.util.Optional;

import com.microservice.app.user.models.entity.Student;

public interface IStudentService {
	
	public Iterable<Student> findAll();
	
	public Optional<Student> findById(Long id);
	
	public Student save(Student student);
	
	public void deleteById(Long id);
}
