package com.microservice.app.course.services;

import com.microservice.app.course.model.entity.Course;
import com.microservice.commons.service.ICommonService;

public interface ICourseService extends ICommonService<Course>{
	public Course findCourseByStudentId(Long id);
	
	public Iterable<Long> getIdExamsWithAnswerStudent(Long studentId);
}
