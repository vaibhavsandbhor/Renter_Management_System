package com.rentmanagementsystem.service;


import com.rentmanagementsystem.dto.DashboardSummaryDTO;
import com.rentmanagementsystem.dto.RecentPaymentDTO;
import com.rentmanagementsystem.entitiy.RentTransactionEntity;
import com.rentmanagementsystem.repo.FlatDetailsRepo;
import com.rentmanagementsystem.repo.RentTransactionrepo;
import com.rentmanagementsystem.repo.RentersRepo;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final FlatDetailsRepo flatRepo;
    private final RentersRepo renterRepo;
    private final RentTransactionrepo txnRepo;

    public DashboardSummaryDTO getDashboardSummary() {
        String monthYear = LocalDate.now().toString().substring(0, 7); // YYYY-MM
        
        System.out.println("monthyear"+monthYear);

        BigDecimal collected = txnRepo.getTotalCollectedForMonth(monthYear);
        BigDecimal pending = txnRepo.getPendingAmountForMonth(monthYear);
        BigDecimal totalDeposits = renterRepo.findAll().stream()
                .map(r -> r.getDepositAmount() == null ? BigDecimal.ZERO : r.getDepositAmount())
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        
        
        long totalRenters = renterRepo.count();
        long totalFlats = flatRepo.count();
        long occupied = flatRepo.countByStatus("occupied");

        double occupancyRate = totalFlats == 0 ? 0 : (occupied * 100.0 / totalFlats);

        return new DashboardSummaryDTO(
                pending == null ? BigDecimal.ZERO : pending,
                collected == null ? BigDecimal.ZERO : collected,
                totalDeposits,
                totalRenters,
                occupancyRate
        );
    }

   public List<RecentPaymentDTO> getRecentPayments() {
        return txnRepo.findRecentPayments().stream()
                .limit(5)
                .map(t -> new RecentPaymentDTO(
                        renterRepo.findById(t.getRenter().getRenterId()).map(r -> r.getRenterName()).orElse("Unknown"),
                        t.getFlat().getFlatId().toString(),
                        t.getPaymentMode(),
                        t.getPaidAmount(),
                        t.getPaymentDate()
                )).collect(Collectors.toList());
    }
}

