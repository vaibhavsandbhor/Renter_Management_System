package com.rentmanagementsystem.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rentmanagementsystem.entitiy.FlatDetails;
import com.rentmanagementsystem.repo.FlatDetailsRepo;

@Service
public class FlatDetailsService {

	
	@Autowired
	
FlatDetailsRepo flatdetailsrepo;
	
	
	
	public ResponseEntity<List<String>> getFlatsByWing(String wingName) {
		   System.out.println("flats"+wingName);
		
	    List<FlatDetails> flats = flatdetailsrepo.findByWing_WingNameIgnoreCase(wingName);
	    
	 
	    List<String> flatNames = flats.stream()
	                                  .map(FlatDetails::getFlatName)
	                                  .collect(Collectors.toList());
	    return ResponseEntity.ok(flatNames);
	}
	
	
	public ResponseEntity<List<String>> getActivateFlatsByWing(String wingName) {
	    List<FlatDetails> flats = flatdetailsrepo.findByWing_WingNameAndIsOccupiedFalse(wingName);
	    List<String> flatNames = flats.stream()
	                                  .map(FlatDetails::getFlatName)
	                                  .collect(Collectors.toList());
	    return ResponseEntity.ok(flatNames);
	}
	
}
