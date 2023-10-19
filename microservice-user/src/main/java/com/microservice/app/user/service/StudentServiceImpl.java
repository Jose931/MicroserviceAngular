package com.microservice.app.user.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservice.app.user.models.repository.StudentRespository;
import com.microservice.commons.service.CommonServiceImpl;
import com.microservice.commons.users.models.entity.Student;

@Service
public class StudentServiceImpl extends CommonServiceImpl<Student, StudentRespository> implements IStudentService{

	@Override
	@Transactional(readOnly = true)
	public List<Student> findByNameOrSecondName(String term) {
		return repository.findByNameOrSecondName(term);
	}

	
}
