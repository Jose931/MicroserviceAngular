package com.microservice.app.user.controllers;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.app.user.service.IStudentService;
import com.microservice.commons.controllers.CommonController;
import com.microservice.commons.users.models.entity.Student;

import jakarta.validation.Valid;

@RestController
public class StudentController extends CommonController<Student, IStudentService>{
	
	@PutMapping("/{id}")
	public ResponseEntity<?> edit(@Valid @RequestBody Student student, BindingResult result, @PathVariable Long id){
		
		if(result.hasErrors()) {
			return this.validate(result);
		}
		
		Optional<Student> s = service.findById(id);
		
		if(s.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Student myStudent = s.get();
		myStudent.setName(student.getName());
		myStudent.setSecondName(student.getSecondName());
		myStudent.setEmail(student.getEmail());
		
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(myStudent));
	}
	
	@GetMapping("/find/{term}")
	public ResponseEntity<?> findByNameOrSecondName(@PathVariable String term){
		return ResponseEntity.ok(service.findByNameOrSecondName(term));
	}

}
