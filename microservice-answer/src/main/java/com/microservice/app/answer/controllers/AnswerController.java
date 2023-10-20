package com.microservice.app.answer.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.app.answer.models.entity.Answer;
import com.microservice.app.answer.service.IAnswerService;

@RestController
public class AnswerController {
	
	@Autowired
	private IAnswerService service;
	
	@PostMapping
	public ResponseEntity<?> create(@RequestBody Iterable<Answer> answers){
		return ResponseEntity.status(HttpStatus.CREATED).body(service.saveAll(answers));
	}
	
	@GetMapping("/student/{studentId}/exam/{examId}")
	public ResponseEntity<?> getAnswerByStudentByExam(@PathVariable Long studentId, @PathVariable Long examId){
		return ResponseEntity.ok(service.findAnswerByStudentByExam(studentId, examId));
	}
	
	@GetMapping("/student/{studentId}/answered-exams")
	public ResponseEntity<?> getIdExamsWithAnswerStudent(@PathVariable Long studentId){
		return ResponseEntity.ok(service.findExamIdWithAnwerByStudent(studentId));
	}

}
