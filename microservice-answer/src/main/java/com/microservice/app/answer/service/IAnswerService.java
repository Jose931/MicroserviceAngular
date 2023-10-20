package com.microservice.app.answer.service;

import com.microservice.app.answer.models.entity.Answer;

public interface IAnswerService {
	
	public Iterable<Answer> saveAll(Iterable<Answer> answer);
	
	public Iterable<Answer> findAnswerByStudentByExam(Long studentId, Long examId);
	
	public Iterable<Long> findExamIdWithAnwerByStudent(Long studentId);
}
