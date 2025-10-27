package com.rentmanagementsystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rentmanagementsystem.dto.TransactionHistoryDTO;
import com.rentmanagementsystem.entitiy.RentTransactionEntity;
import com.rentmanagementsystem.service.TransactionHistoryService;

@RestController
@RequestMapping("/rentertranscation")
@CrossOrigin
public class RenterTransactionController {
	
	@Autowired
	TransactionHistoryService transactionHistoryService;
	
	
	   @GetMapping("/by-month")
	    public List<TransactionHistoryDTO> getTransactionsByMonth(
	            @RequestParam("monthYear") String monthYear)
	           {
	        return transactionHistoryService.getTransactionsByMonth(monthYear);
	    }

	   
	   @PostMapping("/addTransaction")
	   public RentTransactionEntity saveTransaction(@RequestBody TransactionHistoryDTO transaction)
	   {
		  return transactionHistoryService.saveTransaction(transaction);
	   }
}
