package com.rentmanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentmanagementsystem.entitiy.Renters;
import com.rentmanagementsystem.service.RenterService;
@RestController
@RequestMapping("/renter")
@CrossOrigin
public class RenterController {
	
	@Autowired
	RenterService renterservice;

	
	public List<Renters> getAllRenters()
	{
      return renterservice.getAllRenters();
	}
}
