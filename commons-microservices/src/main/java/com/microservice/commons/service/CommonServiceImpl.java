package com.microservice.commons.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public class CommonServiceImpl<E, R extends CrudRepository<E, Long>> implements ICommonService<E>{
	
	@Autowired
	protected R studentDao;

	@Override
	@Transactional(readOnly = true)
	public Iterable<E> findAll() {
		return studentDao.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<E> findById(Long id) {
		return studentDao.findById(id);
	}

	@Override
	@Transactional
	public E save(E entity) {
		return studentDao.save(entity);
	}

	@Override
	@Transactional
	public void deleteById(Long id) {
		studentDao.deleteById(id);
		
	}

}
