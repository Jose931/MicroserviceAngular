package com.microservice.app.user.controllers;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.app.user.models.entity.Student;
import com.microservice.app.user.service.IStudentService;

@RestController
public class StudentController {
	
	@Autowired
	private IStudentService studentService;
	
	@GetMapping("/list/all")
	public ResponseEntity<?> findAll(){
		return ResponseEntity.ok().body(studentService.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> show(@PathVariable Long id){
		return ResponseEntity.of(studentService.findById(id));
	}

}
