package com.microservice.commons.exams.models.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "subjects")
public class Subject {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	@JsonIgnoreProperties(value = {"specificSubject", "handler", "hibernateLazyInitializer"})
	@ManyToOne(fetch = FetchType.LAZY)
	private Subject generalSubject;
	
	@JsonIgnoreProperties(value = {"generalSubject", "handler", "hibernateLazyInitializer"}, allowSetters = true)
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "generalSubject", cascade = CascadeType.ALL)
	private List<Subject> specificSubject;
	
	
	
	public Subject() {
		this.specificSubject = new ArrayList<>();
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Subject getGeneralSubject() {
		return generalSubject;
	}
	public void setGeneralSubject(Subject generalSubject) {
		this.generalSubject = generalSubject;
	}
	public List<Subject> getSpecificSubject() {
		return specificSubject;
	}
	public void setSpecificSubject(List<Subject> specificSubject) {
		this.specificSubject = specificSubject;
	}
	
	
	
}
