package com.microservice.app.course.model.repository;

import org.springframework.data.jpa.repository.Query;

import com.microservice.app.course.model.entity.Course;
import com.microservice.commons.repository.CrudAndPagingAndSortingRepository;

public interface CourseRepository extends CrudAndPagingAndSortingRepository<Course, Long>{

	@Query("select c from Course c join c.students a where a.id=?1")
	public Course findCourseByStudentId(Long id);
	
}
