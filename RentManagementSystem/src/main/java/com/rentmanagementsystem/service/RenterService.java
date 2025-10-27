package com.rentmanagementsystem.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.rentmanagementsystem.dto.RenterDTO;
import com.rentmanagementsystem.entitiy.FlatDetails;
import com.rentmanagementsystem.entitiy.RentTransactionEntity;
import com.rentmanagementsystem.entitiy.Renters;
import com.rentmanagementsystem.entitiy.Wing;
import com.rentmanagementsystem.repo.FlatDetailsRepo;
import com.rentmanagementsystem.repo.RentTransactionrepo;
import com.rentmanagementsystem.repo.RentersRepo;
import com.rentmanagementsystem.repo.WingRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RenterService {
	
	@Autowired
	RentersRepo renterRepo;
	@Autowired
    private RentTransactionrepo rentTransactionRepository;
	
	@Autowired
	private FlatDetailsRepo flatrepo;
	
	@Autowired
	private WingRepo wingrepo;
	
	
	public List<RenterDTO> getAllRenters() {
	    return renterRepo.findByIsActiveTrue()
	            .stream()
	            .map(r -> new RenterDTO(
	                r.getRenterId(),
	                r.getRenterName(),
	                r.getMobileNo(),
	                r.getEmail(),
	                r.getDepositAmount(),
	                r.getMoveInDate(),
	                r.getMoveOutDate(),
	                r.getIsActive(),
	                r.getFlat()!=null ?r.getFlat().getFlatId():null,
	               r.getWing()!=null ? r.getWing().getWingId():null, 		
	                
	                r.getFlat() != null ? r.getFlat().getFlatName() : null,
	                        r.getWing() != null ? r.getWing().getWingName() : null,
	                        		r.getAdharnumber()
	                        		
	            ))
	            .collect(Collectors.toList());
	}

    
//
//    // 1. Get all renters and transactions for a flat
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
    public void saveRenter(RenterDTO dto) {
        Renters renter = new Renters();
        renter.setRenterName(dto.getRenterName());
        renter.setMobileNo(dto.getMobileNo());
        renter.setEmail(dto.getEmail());
        renter.setDepositAmount(dto.getDepositAmount());
        renter.setMoveInDate(dto.getMoveInDate());
        renter.setIsActive(true);
        renter.setAdharnumber(dto.getAdharnumber());

        // ✅ Check if Wing exists
        Wing wing = wingrepo.findByWingName(dto.getWingName())
                .orElseThrow(() -> new RuntimeException("Wing not found: " + dto.getWingName()));

        // ✅ Check if Flat exists under the Wing — update if found, create if not
        FlatDetails flat = flatrepo.findByFlatName(dto.getFlatName())
                .map(existingFlat -> {
                    existingFlat.setStatus("Occupied");
                    existingFlat.setIsOccupied(true);
                    return flatrepo.save(existingFlat); // ✅ return updated flat
                })
                .orElseGet(() -> {
                    FlatDetails newFlat = new FlatDetails();
                    newFlat.setFlatName(dto.getFlatName());
                    newFlat.setWing(wing);
                    newFlat.setStatus("Occupied");
                    newFlat.setIsOccupied(true);
                    return flatrepo.save(newFlat); // ✅ return newly saved flat
                });

        // ✅ Prevent duplicate renter in same flat
        Optional<Renters> existing = renterRepo.findByFlatAndIsActiveTrue(flat);
        if (existing.isPresent()) {
            throw new RuntimeException("Flat " + dto.getFlatName() + " in Wing " + dto.getWingName() + " is already occupied by another renter.");
        }

        // ✅ Assign flat and wing to renter
        renter.setFlat(flat);
        renter.setWing(wing);

        renterRepo.save(renter);
    }


    public ResponseEntity<?> deleteRenter(Integer id) {
    	
    	System.out.println("id"+id);
        Renters renter = renterRepo.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Renter not found with ID: " + id));

        renter.setIsActive(false);
        renter.setMoveOutDate(LocalDate.now());
        FlatDetails flat=renter.getFlat();
        flat.setIsOccupied(false);
        flat.setStatus("Available");
        
        flatrepo.save(flat);
        renterRepo.save(renter);
		return new  ResponseEntity(HttpStatus.OK) ;
    }

}
