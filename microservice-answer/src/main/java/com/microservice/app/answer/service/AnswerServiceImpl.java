package com.microservice.app.answer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservice.app.answer.models.entity.Answer;
import com.microservice.app.answer.models.repository.AnswerRepository;

@Service
public class AnswerServiceImpl implements IAnswerService{

	@Autowired
	private AnswerRepository repository;
	
	@Override
	@Transactional
	public Iterable<Answer> saveAll(Iterable<Answer> answer) {
		return repository.saveAll(answer);
	}

	@Override
	@Transactional(readOnly = true)
	public Iterable<Answer> findAnswerByStudentByExam(Long studentId, Long examId) {
		return repository.findAnswerByStudentByExam(studentId, examId);
	}

	@Override
	@Transactional(readOnly = true)
	public Iterable<Long> findExamIdWithAnwerByStudent(Long studentId) {
		return repository.findExamIdWithAnwerByStudent(studentId);
	}

}
