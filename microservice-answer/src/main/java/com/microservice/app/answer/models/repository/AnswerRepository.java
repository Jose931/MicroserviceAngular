package com.microservice.app.answer.models.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.microservice.app.answer.models.entity.Answer;

public interface AnswerRepository extends CrudRepository<Answer, Long>{

	
	@Query("select a from Answer a join fetch a.student s join fetch a.question q join fetch q.exam e where s.id = ?1 and e.id =?2")
	public Iterable<Answer> findAnswerByStudentByExam(Long studentId, Long examId);
	
	@Query("select e.id from Answer a join a.student s join a.question q join q.exam e where s.id=?1 group by e.id")
	public Iterable<Long> findExamIdWithAnwerByStudent(Long studentId);
}
