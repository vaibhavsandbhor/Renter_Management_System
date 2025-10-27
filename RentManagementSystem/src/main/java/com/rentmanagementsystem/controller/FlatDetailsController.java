package com.rentmanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentmanagementsystem.entitiy.FlatDetails;
import com.rentmanagementsystem.service.FlatDetailsService;

@RestController
@RequestMapping("/flatdetails")
@CrossOrigin
public class FlatDetailsController {
	
	@Autowired
	FlatDetailsService flaDetailsService;
	
	@GetMapping("/flats/{wingName}")
	public ResponseEntity<List<String>> getFlatsByWing(@PathVariable("wingName") String wingName) {
	   
	    return flaDetailsService.getFlatsByWing(wingName);
	}
	
	
    @GetMapping("/available/{wingName}")
    public ResponseEntity<List<String>> getActivateFlatsByWing(@PathVariable("wingName") String wingName) { 
  
        return   flaDetailsService.getActivateFlatsByWing(wingName);
    }
}


