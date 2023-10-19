package com.microservice.app.course.model.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.ManyToAny;

import com.microservice.commons.exams.models.entity.Exam;
import com.microservice.commons.users.models.entity.Student;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name="course")
public class Course {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotEmpty
	private String name;
	
	@Column(name = "create_at")
	@Temporal(TemporalType.TIMESTAMP)
	private Date createAt;
	
	@OneToMany(fetch = FetchType.LAZY)
	private List<Student> students;
	
	@ManyToAny(fetch = FetchType.LAZY)
	private List<Exam> exams;
	
	@PrePersist
	public void prePersist() {
		this.createAt = new Date();
	}
	
	

	public Course() {
		this.students = new ArrayList<>();
		this.exams = new ArrayList<>();
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

	public List<Student> getStudents() {
		return students;
	}

	public void setStudents(List<Student> students) {
		this.students = students;
	}
	
	public void addStudents(Student student) {
		this.students.add(student);
	}
	
	public void removeStudents(Student student) {
		this.students.remove(student);
	}

	public List<Exam> getExams() {
		return exams;
	}

	public void setExams(List<Exam> exams) {
		this.exams = exams;
	}
	
	public void addExam(Exam exam) {
		this.exams.add(exam);
	}
	
	public void removeExam(Exam exam) {
		this.exams.remove(exam);
	}

	
	

}
