package com.microservice.app.user.controllers;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.app.user.models.entity.Student;
import com.microservice.app.user.service.IStudentService;
import com.microservice.commons.controllers.CommonController;

@RestController
public class StudentController extends CommonController<Student, IStudentService>{
	
	@PutMapping("/{id}")
	public ResponseEntity<?> edit(@RequestBody Student student, @PathVariable Long id){
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

}
