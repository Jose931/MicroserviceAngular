package com.microservice.app.course.services;

import org.springframework.stereotype.Service;

import com.microservice.app.course.model.entity.Course;
import com.microservice.app.course.model.repository.CourseRepository;
import com.microservice.commons.service.CommonServiceImpl;

@Service
public class CourseServiceImpl extends CommonServiceImpl<Course, CourseRepository> implements ICourseService {

}
