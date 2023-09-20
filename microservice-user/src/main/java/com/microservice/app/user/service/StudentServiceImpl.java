package com.microservice.app.user.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.microservice.app.user.models.entity.Student;
import com.microservice.app.user.models.repository.StudentRespository;

@Service
public class StudentServiceImpl implements IStudentService{
	
	@Autowired
	private StudentRespository studentDao;

	@Override
	@Transactional(readOnly = true)
	public Iterable<Student> findAll() {
		return studentDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Student> findById(Long id) {
		return studentDao.findById(id);
	}

	@Override
	@Transactional
	public Student save(Student student) {
		return studentDao.save(student);
	}

	@Override
	@Transactional
	public void deleteById(Long id) {
		studentDao.deleteById(id);
		
	}

}
