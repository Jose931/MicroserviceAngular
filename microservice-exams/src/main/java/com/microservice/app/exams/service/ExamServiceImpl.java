package com.microservice.app.exams.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservice.app.exams.models.repository.ExamRepository;
import com.microservice.app.exams.models.repository.SubjectRepository;
import com.microservice.commons.exams.models.entity.Exam;
import com.microservice.commons.exams.models.entity.Subject;
import com.microservice.commons.service.CommonServiceImpl;

@Service
public class ExamServiceImpl extends CommonServiceImpl<Exam, ExamRepository> implements IExamService{

	@Autowired
	private SubjectRepository subjectRepository;
	
	@Override
	@Transactional(readOnly = true)
	public List<Exam> findByName(String term) {
		System.out.print(repository.findByName(term));
		return repository.findByName(term);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Subject> findAllSubjects() {
		return (List<Subject>) subjectRepository.findAll();
	}
	
}
