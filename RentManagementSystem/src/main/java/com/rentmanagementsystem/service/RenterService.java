package com.rentmanagementsystem.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rentmanagementsystem.entitiy.RentTransactionEntity;
import com.rentmanagementsystem.entitiy.Renters;
import com.rentmanagementsystem.repo.RentTransactionrepo;
import com.rentmanagementsystem.repo.RentersRepo;

@Service
public class RenterService {
	
	@Autowired
	RentersRepo renterRepo;
	@Autowired
    private RentTransactionrepo rentTransactionRepository;
	
	
	public List<Renters>  getAllRenters()
	{
		 return renterRepo.findByIsActiveTrue();
	}

    

    // 1. Get all renters and transactions for a flat
    public Map<Renters, List<RentTransactionEntity>> getRentersAndTransactionsByFlatId(Integer flatId) {
        List<RentTransactionEntity> transactions = rentTransactionRepository.findAllTransactionsByFlatId(flatId);

        Map<Renters, List<RentTransactionEntity>> result = new HashMap<>();
        for (RentTransactionEntity tx : transactions) {
            result.computeIfAbsent(tx.getRenter(), k -> new ArrayList<>()).add(tx);
        }
        return result;
    }

    // 2. Get all transactions for a renter and flat
    public List<RentTransactionEntity> getTransactionsByRenterAndFlat(String renterName, String flatName) {
        return rentTransactionRepository.findAllTransactionsByRenterAndFlat(renterName, flatName);
    }
}
