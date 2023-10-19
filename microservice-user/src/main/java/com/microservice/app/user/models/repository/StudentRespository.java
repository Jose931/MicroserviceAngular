package com.microservice.app.user.models.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.microservice.commons.repository.CrudAndPagingAndSortingRepository;
import com.microservice.commons.users.models.entity.Student;

public interface StudentRespository extends CrudAndPagingAndSortingRepository<Student, Long>{

	@Query("select a from Student a where a.name like %?1% or a.secondName like %?1%")
	public List<Student> findByNameOrSecondName(String term);
		
}
