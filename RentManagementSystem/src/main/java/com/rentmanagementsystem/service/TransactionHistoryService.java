package com.rentmanagementsystem.service;

import com.rentmanagementsystem.dto.TransactionHistoryDTO;
import com.rentmanagementsystem.entitiy.FlatDetails;
import com.rentmanagementsystem.entitiy.RentTransactionEntity;
import com.rentmanagementsystem.entitiy.Renters;
import com.rentmanagementsystem.entitiy.Wing;
import com.rentmanagementsystem.repo.FlatDetailsRepo;
import com.rentmanagementsystem.repo.MasterUserRepo;
import com.rentmanagementsystem.repo.RentTransactionrepo;
import com.rentmanagementsystem.repo.RentersRepo;
import com.rentmanagementsystem.repo.WingRepo;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionHistoryService {

    private final RentTransactionrepo transactionRepo;
    private final RentersRepo renterRepo;
    
   

    private final FlatDetailsRepo flatRepository;
    private final WingRepo wingRepository;
    private final MasterUserRepo userRepository;
//
    public List<TransactionHistoryDTO> getTransactionsByMonth(String monthYear) {
       // Pageable pageable = PageRequest.of(page, size);

        // Make sure the repository method returns List<RentTransactionEntity>
        List<RentTransactionEntity> transactions = transactionRepo
                .findByMonthYear(monthYear);
        
        
        System.out.println("transactions"+transactions.size());

        // Explicit type in map lambda
        return transactions.stream()
                .<TransactionHistoryDTO>map((RentTransactionEntity txn) -> {
                    Renters renter = txn.getRenter();   
                    FlatDetails flat = txn.getFlat();   
                    Wing wing = flat != null ? flat.getWing() : (renter != null ? renter.getWing() : null);

                    return TransactionHistoryDTO.builder()
                            .date(txn.getPaymentDate())
                            .renterName(renter != null ? renter.getRenterName() : "Unknown")
                            .flat(flat != null ? flat.getFlatName() : "-")
                            .wing(wing != null ? wing.getWingName() : "-")
                            .type("Rent")
                            .method(txn.getPaymentMode())
                            .amount(txn.getPaidAmount())
                            .status("completed")
                            .build();
                }).collect(Collectors.toList());
    }


    public RentTransactionEntity saveTransaction(TransactionHistoryDTO dto) {
        RentTransactionEntity txn = new RentTransactionEntity();

        Renters renter = renterRepo.findByRenterName(dto.getRenterName())
                .orElseThrow(() -> new RuntimeException("Renter not found: " + dto.getRenterName()));
        FlatDetails flat = flatRepository.findByFlatName(dto.getFlat())
                .orElseThrow(() -> new RuntimeException("Flat not found: " + dto.getFlat()));
        Wing wing = wingRepository.findByWingName(dto.getWing())
                .orElseThrow(() -> new RuntimeException("Wing not found: " + dto.getWing()));
//        MasterUser user = userRepository.findByUsername(dto.getUsername())
//                .orElseThrow(() -> new RuntimeException("User not found: " + dto.getUsername()));

        txn.setRenter(renter);
        txn.setFlat(flat);
        txn.setWing(wing);
     //   txn.setUser(user);
        txn.setMonthYear(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM")));

        txn.setRentAmount(BigDecimal.valueOf(5000.0));
        txn.setPaidAmount(dto.getAmount());
        txn.setPaymentDate(LocalDate.now());
        txn.setPaymentMode(dto.getMethod());
        
        if (dto.getAmount().compareTo(BigDecimal.valueOf(5000)) == 0) {
            txn.setRemarks("Full Payment");
        } else if (dto.getAmount().compareTo(BigDecimal.valueOf(5000)) < 0) {
            txn.setRemarks("Partial Payment");
        } else {
            txn.setRemarks("Overpaid"); // optional case if amount > 5000
        }


        return transactionRepo.save(txn);
    }
}
//


    // 🔹 Export as Excel
    
    
    

  

