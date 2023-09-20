package com.microservice.app.user.service;

import org.springframework.stereotype.Service;

import com.microservice.app.user.models.entity.Student;
import com.microservice.app.user.models.repository.StudentRespository;
import com.microservice.commons.service.CommonServiceImpl;

@Service
public class StudentServiceImpl extends CommonServiceImpl<Student, StudentRespository> implements IStudentService{

	
}
