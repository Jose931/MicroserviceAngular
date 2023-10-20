package com.microservice.app.course.clients;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "microservice-answer")
public interface AnswerFeignClient {

	@GetMapping("/student/{studentId}/answered-exams")
	public Iterable<Long> getIdExamsWithAnswerStudent(@PathVariable Long studentId);
}
