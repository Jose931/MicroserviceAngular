package com.microservice.app.exams.models.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.microservice.commons.exams.models.entity.Exam;
import com.microservice.commons.repository.CrudAndPagingAndSortingRepository;

public interface ExamRepository extends CrudAndPagingAndSortingRepository<Exam, Long>{
	
	@Query("select e from Exam e where e.name like %?1%")
	public List<Exam> findByName(String term);
}
