package com.rentmanagementsystem.service;

import com.rentmanagementsystem.dto.TransactionHistoryDTO;
import com.rentmanagementsystem.entitiy.FlatDetails;
import com.rentmanagementsystem.entitiy.RentTransactionEntity;
import com.rentmanagementsystem.entitiy.Renters;
import com.rentmanagementsystem.entitiy.Wing;
import com.rentmanagementsystem.repo.RentTransactionrepo;
import com.rentmanagementsystem.repo.RentersRepo;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TransactionHistoryService {

    private final RentTransactionrepo transactionRepo;
    private final RentersRepo renterRepo;
//
//    public List<TransactionHistoryDTO> getTransactionsByMonth(String monthYear, String wingName, int page, int size) {
//       // Pageable pageable = PageRequest.of(page, size);
//
//        // Make sure the repository method returns List<RentTransactionEntity>
//        List<RentTransactionEntity> transactions = transactionRepo
//                .findAllByMonthYearAndRenter_Wing_WingName(monthYear, wingName);
//
//        // Explicit type in map lambda
//        return transactions.stream()
//                .<TransactionHistoryDTO>map((RentTransactionEntity txn) -> {
//                    Renters renter = txn.getRenter();   
//                    FlatDetails flat = txn.getFlat();   
//                    Wing wing = flat != null ? flat.getWing() : (renter != null ? renter.getWing() : null);
//
//                    return TransactionHistoryDTO.builder()
//                            .date(txn.getPaymentDate())
//                            .renterName(renter != null ? renter.getRentertName() : "Unknown")
//                            .flat(flat != null ? flat.getFlatName() : "-")
//                            .wing(wing != null ? wing.getWingName() : "-")
//                            .type("Rent")
//                            .method(txn.getPaymentMode())
//                            .amount(txn.getPaidAmount())
//                            .status("completed")
//                            .build();
//                }).collect(Collectors.toList());
//    }
//


    // 🔹 Export as Excel
  
}
