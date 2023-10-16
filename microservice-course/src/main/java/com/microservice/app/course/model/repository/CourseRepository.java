package com.microservice.app.course.model.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.microservice.app.course.model.entity.Course;

public interface CourseRepository extends CrudRepository<Course, Long>{

	@Query("select c from Course c join c.students a where a.id=?1")
	public Course findCourseByStudentId(Long id);
	
}
