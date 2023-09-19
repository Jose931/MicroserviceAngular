package com.microservice.app.user.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.app.user.models.entity.Student;
import com.microservice.app.user.service.IStudentService;

@RestController
public class StudentController {

	@Autowired
	private IStudentService studentService;

	@GetMapping
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok().body(studentService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		return ResponseEntity.of(studentService.findById(id));
	}
	
	@PostMapping
	public ResponseEntity<?> create(@RequestBody Student student){
		return ResponseEntity.status(HttpStatus.CREATED).body(studentService.save(student));
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> edit(@RequestBody Student student, @PathVariable Long id){
		Optional<Student> s = studentService.findById(id);
		
		if(s.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Student myStudent = s.get();
		myStudent.setName(student.getName());
		myStudent.setSecondName(student.getSecondName());
		myStudent.setEmail(student.getEmail());
		
		return ResponseEntity.status(HttpStatus.CREATED).body(studentService.save(myStudent));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){
		studentService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
