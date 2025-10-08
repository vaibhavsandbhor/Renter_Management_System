package com.rentmanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rentmanagementsystem.dto.DashboardSummaryDTO;
import com.rentmanagementsystem.dto.PendingRentDTO;
import com.rentmanagementsystem.dto.RecentPaymentDTO;
import com.rentmanagementsystem.service.DashboardService;
import com.rentmanagementsystem.service.PendingRentService;

@RestController
@RequestMapping("/dashboard")
@CrossOrigin
public class DashBoardController {
	
	@Autowired
	DashboardService dashboardService;
	@Autowired
	PendingRentService  pendingrentservice;
	
	
	@GetMapping("/getdefaulterrenter")
	public List<PendingRentDTO> getDefaulterrenter()
	{
		
		
		return pendingrentservice.getPendingRentDetails();
		
	}
	
	@GetMapping("/dashboardsummary")
	public DashboardSummaryDTO getDashboardSummary()
	{
		
		return dashboardService.getDashboardSummary();
	}
	@GetMapping("/recentpaymentdetails")
	public List<RecentPaymentDTO> getRecentPaymentDetails()
	{
		return dashboardService.getRecentPayments();
		
	}

}
