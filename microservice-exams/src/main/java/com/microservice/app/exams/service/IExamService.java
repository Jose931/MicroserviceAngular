package com.microservice.app.exams.service;

import java.util.List;

import com.microservice.commons.exams.models.entity.Exam;
import com.microservice.commons.exams.models.entity.Subject;
import com.microservice.commons.service.ICommonService;

public interface IExamService extends ICommonService<Exam>{

	public List<Exam> findByName(String term);
	
	public List<Subject> findAllSubjects();
}
