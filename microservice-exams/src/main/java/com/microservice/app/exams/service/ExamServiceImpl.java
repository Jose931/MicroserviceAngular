package com.microservice.app.exams.service;

import org.springframework.stereotype.Service;

import com.microservice.app.exams.models.entity.Exam;
import com.microservice.app.exams.models.repository.ExamRepository;
import com.microservice.commons.service.CommonServiceImpl;

@Service
public class ExamServiceImpl extends CommonServiceImpl<Exam, ExamRepository> implements IExamService{
	
}
