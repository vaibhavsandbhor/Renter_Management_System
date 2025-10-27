package com.rentmanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentmanagementsystem.dto.RenterDTO;
import com.rentmanagementsystem.entitiy.RentTransactionEntity;
import com.rentmanagementsystem.entitiy.Renters;
import com.rentmanagementsystem.service.RenterService;
@RestController
@RequestMapping("/renter")
@CrossOrigin
public class RenterController {
	
	@Autowired
	RenterService renterservice;

	@GetMapping("/getALLrenters")
	public List<RenterDTO> getAllRenters()
	{
      return renterservice.getAllRenters();
	}
	
	
	
@PostMapping("/addRenter")
public void saveRenter(@RequestBody RenterDTO renterdto)
{
	 renterservice.saveRenter(renterdto);
	
}

@DeleteMapping("/deleterenter/{renterId}")
public ResponseEntity<?> deleteRenter(@PathVariable("renterId") Integer renterId) {
    return renterservice.deleteRenter(renterId);
}

	
	
//	public List<RentTransactionEntity> getAllTransctionDetails()
//	{
//		return ;
//		
//	}
}
