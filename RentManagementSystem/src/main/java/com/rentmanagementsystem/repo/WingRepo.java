package com.rentmanagementsystem.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentmanagementsystem.entitiy.Wing;

public interface WingRepo extends JpaRepository<Wing, Integer> {
	
	  Optional<Wing> findByWingName(String wingName);
	

}
