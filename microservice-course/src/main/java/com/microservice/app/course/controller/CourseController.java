package com.microservice.app.course.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
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

import jakarta.validation.Valid;

@RestController
public class CourseController extends CommonController<Course, ICourseService> {

	@Value("${config.balancer.test}")
	private String balancerTest;
	
	@GetMapping("/balacer-test")
	public ResponseEntity<?> balancerTest() {
		Map<String, Object> response = new HashMap<>();
		
		response.put("balancer", balancerTest);
		response.put("courses", service.findAll());
		return ResponseEntity.ok(response);
	}

	@PutMapping("/{id}")
	public ResponseEntity<?> edit(@Valid @RequestBody Course course, BindingResult result, @PathVariable Long id) {

		if (result.hasErrors()) {
			return this.validate(result);
		}

		Optional<Course> c = this.service.findById(id);

		if (c.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		c.get().setName(course.getName());

		return ResponseEntity.status(HttpStatus.CREATED).body(this.service.save(c.get()));
	}

	@PutMapping("/{id}/assign-students")
	public ResponseEntity<?> assignStudents(@RequestBody List<Student> students, @PathVariable Long id) {

		Optional<Course> c = this.service.findById(id);

		if (c.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Course course = c.get();

		students.forEach(s -> {
			course.addStudents(s);
		});

		return ResponseEntity.status(HttpStatus.CREATED).body(this.service.save(course));
	}

	@PutMapping("/{id}/delte-student")
	public ResponseEntity<?> deleteStudent(@RequestBody Student student, @PathVariable Long id) {

		Optional<Course> c = this.service.findById(id);

		if (c.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Course course = c.get();

		course.removeStudents(student);

		return ResponseEntity.status(HttpStatus.CREATED).body(this.service.save(course));
	}

	@GetMapping("/student/{id}")
	public ResponseEntity<?> findByStudentId(@PathVariable Long id) {
		Course course = service.findCourseByStudentId(id);

		if (course != null) {
			List<Long> idExams = (List<Long>) service.getIdExamsWithAnswerStudent(id);

			course.setExams(course.getExams().stream().map(exam -> {
				if (idExams.contains(exam.getId())) {
					exam.setAnswered(true);
				}
				return exam;
			}).collect(Collectors.toList()));
		}

		return ResponseEntity.ok(course);
	}

	@PutMapping("/{id}/assign-exam")
	public ResponseEntity<?> assignExam(@RequestBody List<Exam> exams, @PathVariable Long id) {

		Optional<Course> c = this.service.findById(id);

		if (c.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Course course = c.get();

		exams.forEach(e -> {
			course.addExam(e);
		});

		return ResponseEntity.status(HttpStatus.CREATED).body(this.service.save(course));
	}

	@PutMapping("/{id}/delte-exam")
	public ResponseEntity<?> deleteExam(@RequestBody Exam exam, @PathVariable Long id) {

		Optional<Course> c = this.service.findById(id);

		if (c.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		Course course = c.get();

		course.removeExam(exam);

		return ResponseEntity.status(HttpStatus.CREATED).body(this.service.save(course));
	}
}
