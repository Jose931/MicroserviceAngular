package com.microservice.app.user.models.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.microservice.commons.users.models.entity.Student;

public interface StudentRespository extends CrudRepository<Student, Long>{

	@Query("select a from Student a where a.name like %?1% or a.secondName like %?1%")
	public List<Student> findByNameOrSecondName(String term);
		
}
