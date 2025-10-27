package com.rentmanagementsystem.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rentmanagementsystem.entitiy.FlatDetails;
import com.rentmanagementsystem.entitiy.Wing;

public interface FlatDetailsRepo extends JpaRepository<FlatDetails, Integer> {

	
	long countByStatus(String status);
	
	
	  Optional<FlatDetails> findByFlatName(String flatName);

	  List<FlatDetails> findByWing_WingNameIgnoreCase(String wingName);


	
	  
	  
	    // ✅ (Optional) If you only want *unoccupied* flats:
	    List<FlatDetails> findByWing_WingNameAndIsOccupiedFalse(String wingName);
}
