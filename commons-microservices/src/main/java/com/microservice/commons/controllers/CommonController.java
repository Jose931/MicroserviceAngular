package com.microservice.commons.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.microservice.commons.service.ICommonService;

public class CommonController<E, S extends ICommonService<E>> {

	@Autowired
	protected S service;

	@GetMapping("/page")
	public ResponseEntity<?> findAll(Pageable pageable) {
		return ResponseEntity.ok().body(service.findAll(pageable));
	}
	
	@GetMapping
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok().body(service.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> show(@PathVariable Long id) {
		return ResponseEntity.of(service.findById(id));
	}
	
	@PostMapping
	public ResponseEntity<?> create(@Validated @RequestBody E entity, BindingResult result){
		
		if(result.hasErrors()) {
			return this.validate(result);
		}
		return ResponseEntity.status(HttpStatus.CREATED).body(service.save(entity));
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id){
		service.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
	protected ResponseEntity<?> validate(BindingResult result){
		Map<String, Object> errors = new HashMap<>();
		
		result.getFieldErrors().forEach(err -> {
			errors.put(err.getField(), "The field " + err.getField() + " " + err.getDefaultMessage());
		});
		return ResponseEntity.badRequest().body(errors);
	}

}
