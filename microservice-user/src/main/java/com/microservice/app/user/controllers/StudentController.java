package com.microservice.app.user.controllers;

import java.io.IOException;
import java.util.Optional;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.microservice.app.user.service.IStudentService;
import com.microservice.commons.controllers.CommonController;
import com.microservice.commons.users.models.entity.Student;

import jakarta.validation.Valid;

@RestController
public class StudentController extends CommonController<Student, IStudentService>{
	
	@GetMapping("/uploads/img/{id}")
	public ResponseEntity<?> showPhoto(@PathVariable Long id){
		
		Optional<Student> s = service.findById(id);
		
		if(s.isEmpty() || s.get().getPhoto() == null) {
			return ResponseEntity.notFound().build();
		}
		
		Resource img = new ByteArrayResource(s.get().getPhoto());
		
		return ResponseEntity.ok()
				.contentType(MediaType.IMAGE_JPEG)
				.body(img);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> edit(@Valid @RequestBody Student student, BindingResult result, @PathVariable Long id){
		
		if(result.hasErrors()) {
			return this.validate(result);
		}
		
		Optional<Student> s = service.findById(id);
		
		if(s.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Student myStudent = s.get();
		myStudent.setName(student.getName());
		myStudent.setSecondName(student.getSecondName());
		myStudent.setEmail(student.getEmail());
		
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(myStudent));
	}
	
	@GetMapping("/find/{term}")
	public ResponseEntity<?> findByNameOrSecondName(@PathVariable String term){
		return ResponseEntity.ok(service.findByNameOrSecondName(term));
	}

	@PostMapping("/create-with-photo")
	public ResponseEntity<?> createWithPhoto(@Valid Student entity, BindingResult result, 
			@RequestParam MultipartFile archive) throws IOException {
		
		if(!archive.isEmpty()) {
			entity.setPhoto(archive.getBytes());
		}
		
		return super.create(entity, result);
	}
	
	@PutMapping("/edit-with-photo/{id}")
	public ResponseEntity<?> editWithPhoto(@Valid Student student, BindingResult result, @PathVariable Long id, 
			@RequestParam MultipartFile archive) throws IOException{
		
		if(result.hasErrors()) {
			return this.validate(result);
		}
		
		Optional<Student> s = service.findById(id);
		
		if(s.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Student myStudent = s.get();
		myStudent.setName(student.getName());
		myStudent.setSecondName(student.getSecondName());
		myStudent.setEmail(student.getEmail());
		
		if(!archive.isEmpty()) {
			student.setPhoto(archive.getBytes());
		}
		
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(myStudent));
	}
	
	

}
