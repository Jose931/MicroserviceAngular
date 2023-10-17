package com.microservice.app.course.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.microservice.app.course.model.entity.Course;
import com.microservice.app.course.services.ICourseService;
import com.microservice.commons.controllers.CommonController;
import com.microservice.commons.exams.models.entity.Exam;
import com.microservice.commons.users.models.entity.Student;

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
	
	@PutMapping("/{id}/assign-students")
	public ResponseEntity<?> assignStudents(@RequestBody List<Student> students, @PathVariable Long id){

		Optional<Course> c = this.service.findById(id);
		
		if(c.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Course course = c.get();
		
		students.forEach(s -> {
			course.addStudents(s);
		});
		
		return ResponseEntity.status(HttpStatus.CREATED).body(course);
	}
	
	@PutMapping("/{id}/delte-student")
	public ResponseEntity<?> deleteStudent(@RequestBody Student student, @PathVariable Long id){

		Optional<Course> c = this.service.findById(id);
		
		if(c.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Course course = c.get();
		
		course.removeStudents(student);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(course);
	}
	
	@GetMapping("/student/{id}")
	public ResponseEntity<?> findByStudentId(@PathVariable Long id){
		return ResponseEntity.ok(service.findCourseByStudentId(id));
	}
	
	@PutMapping("/{id}/assign-exam")
	public ResponseEntity<?> assignExam(@RequestBody List<Exam> exams, @PathVariable Long id){

		Optional<Course> c = this.service.findById(id);
		
		if(c.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Course course = c.get();
		
		exams.forEach(e -> {
			course.addExam(e);
		});
		
		return ResponseEntity.status(HttpStatus.CREATED).body(course);
	}
	
	@PutMapping("/{id}/delte-exam")
	public ResponseEntity<?> deleteExam(@RequestBody Exam exam, @PathVariable Long id){

		Optional<Course> c = this.service.findById(id);
		
		if(c.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Course course = c.get();
		
		course.removeExam(exam);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(course);
	}
}
