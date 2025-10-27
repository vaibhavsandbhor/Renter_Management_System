package com.rentmanagementsystem.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentmanagementsystem.service.WingReportService;



@RestController
@RequestMapping("/wingreport")
@CrossOrigin
public class WingReportController {
	
	@Autowired
	WingReportService wingReportService;
	
	
	  @GetMapping("/report")
	    public List<Map<String, Object>> getCurrentMonthReport() {
	        return wingReportService.getCurrentMonthReport();
	    }

}
