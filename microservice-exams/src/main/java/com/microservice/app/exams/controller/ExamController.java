package com.microservice.app.exams.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.app.exams.service.IExamService;
import com.microservice.commons.controllers.CommonController;
import com.microservice.commons.exams.models.entity.Exam;

import jakarta.validation.Valid;

@RestController
public class ExamController extends CommonController<Exam, IExamService> {

	@PutMapping("/{id}")
	public ResponseEntity<?> edit(@Valid @RequestBody Exam exam, BindingResult result, @PathVariable Long id) {
		
		if(result.hasErrors()) {
			return this.validate(result);
		}
		
		Optional<Exam> e = service.findById(id);

		if (e.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Exam ex = e.get();
		ex.setName(exam.getName());

		ex.getQuestions().stream()
			.filter(q -> !exam.getQuestions().contains(q))
			.forEach(ex::removeQuestion);

		ex.setQuestions(exam.getQuestions());
		
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(ex));
	}
	
	@GetMapping("/filter/{term}")
	public ResponseEntity<?> filter(@PathVariable String term){
		return ResponseEntity.ok(service.findByName(term));
	}
	
	@GetMapping("/subjects")
	public ResponseEntity<?> listSubjects(){
		return ResponseEntity.ok(service.findAllSubjects());
	}

}
