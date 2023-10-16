package com.microservice.app.user.service;

import java.util.List;

import com.microservice.commons.service.ICommonService;
import com.microservice.commons.users.models.entity.Student;

public interface IStudentService extends ICommonService<Student>{
	
	public List<Student> findByNameOrSecondName(String term);
}
