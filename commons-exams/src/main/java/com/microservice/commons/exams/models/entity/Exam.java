package com.microservice.commons.exams.models.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="exams")
public class Exam {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty
	@Size(min = 4, max = 30)
	private String name;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_at")
	private Date createAt;

	@JsonIgnoreProperties(value = {"exam"}, allowSetters = true)
	@OneToMany(mappedBy = "exam",fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Question> questions;
	
	@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer"})
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	private Subject generalSubject;
	
	@JsonIgnoreProperties(value = {"handler", "hibernateLazyInitializer"})
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	private Subject specificSubject;
	
	@Transient
	private boolean answered;
	
	public Exam() {
		this.questions = new ArrayList<>();
	}
	
	@PrePersist
	public void prePersist() {
		this.createAt = new Date();
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

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}
	
	public List<Question> getQuestions() {
		return questions;
	}
	
	public void setQuestions(List<Question> questions) {
		this.questions.clear();
		questions.forEach(this::addQuestion);
	}
	
	public void addQuestion(Question question) {
		this.questions.add(question);
		question.setExam(this);
	}
	
	public void removeQuestion(Question question) {
		this.questions.remove(question);
		question.setExam(null);
	}

	public Subject getGeneralSubject() {
		return generalSubject;
	}

	public void setGeneralSubject(Subject generalSubject) {
		this.generalSubject = generalSubject;
	}

	public Subject getSpecificSubject() {
		return specificSubject;
	}

	public void setSpecificSubject(Subject specificSubject) {
		this.specificSubject = specificSubject;
	}

	public boolean isAnswered() {
		return answered;
	}

	public void setAnswered(boolean answered) {
		this.answered = answered;
	}

	@Override
	public boolean equals(Object obj) {

		if(this == obj) {
			return true;
		}
		
		if(!(obj instanceof Exam)) {
			return false;
		}
		
		Exam s = (Exam) obj;
		
		return this.id != null && this.id.equals(s.getId());
	}
	
}
