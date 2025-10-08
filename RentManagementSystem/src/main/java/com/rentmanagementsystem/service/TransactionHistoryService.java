package com.rentmanagementsystem.service;

import com.rentmanagementsystem.dto.TransactionHistoryDTO;
import com.rentmanagementsystem.entitiy.FlatDetails;
import com.rentmanagementsystem.entitiy.RentTransactionEntity;
import com.rentmanagementsystem.entitiy.Renters;
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

    // 🔹 Paginated & Filtered Data Fetch
    public List<TransactionHistoryDTO> getTransactionsByMonth(String monthYear, String wing, int page, int size) {
        List<RentTransactionEntity> transactions = transactionRepo.findByMonthYearAndWing(monthYear, wing);

        return transactions.stream().map(txn -> {
            Renters renter = txn.getRenter();   // <-- directly use the mapped renter
            FlatDetails flat = txn.getFlat();   // <-- directly use the mapped flat

            return TransactionHistoryDTO.builder()
                    .date(txn.getPaymentDate())
                    .renterName(renter != null ? renter.getRentertName() : "Unknown")
                    .flat(flat != null ? flat.getFlatName() : "-")
                    .wing(flat != null && flat.getWing() != null ? flat.getWing().getWingName() : "-")
                    .type("Rent")
                    .method(txn.getPaymentMode())
                    .amount(txn.getPaidAmount())
                    .status("completed")
                    .build();
        }).collect(Collectors.toList());
    }

    // 🔹 Export as Excel
  
}
