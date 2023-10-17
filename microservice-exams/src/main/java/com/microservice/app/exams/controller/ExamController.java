package com.microservice.app.exams.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.app.exams.service.IExamService;
import com.microservice.commons.controllers.CommonController;
import com.microservice.commons.exams.models.entity.Exam;

@RestController
public class ExamController extends CommonController<Exam, IExamService> {

	@PutMapping("/{id}")
	public ResponseEntity<?> edit(@RequestBody Exam exam, @PathVariable Long id) {
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

}
