package com.microservice.app.course.controller;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.app.course.model.entity.Course;
import com.microservice.app.course.services.ICourseService;
import com.microservice.commons.controllers.CommonController;

@RestController
public class CourseController extends CommonController<Course, ICourseService>{

	
	@PutMapping("/{id}")
	public ResponseEntity<?> edit(@RequestBody Course course, @PathVariable Long id){
		
		Optional<Course> c = this.service.findById(id);
		
		if(c.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		c.get().setName(course.getName());
		
		return ResponseEntity.status(HttpStatus.CREATED).body(this.service.save(c.get()));
	}
}
