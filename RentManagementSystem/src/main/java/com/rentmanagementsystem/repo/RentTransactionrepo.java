package com.rentmanagementsystem.repo;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.rentmanagementsystem.entitiy.RentTransactionEntity;

public interface RentTransactionrepo extends JpaRepository<RentTransactionEntity, Integer> {
	@Query("SELECT SUM(rt.paidAmount) FROM RentTransactionEntity rt WHERE FUNCTION('to_char', rt.paymentDate, 'YYYY-MM') = :monthYear")
    BigDecimal getCollectedAmountForMonth(String monthYear);

    @Query("SELECT r FROM RentTransactionEntity r ORDER BY r.paymentDate DESC")
    List<RentTransactionEntity> findRecentPayments();

    @Query("SELECT COALESCE(SUM(r.rentAmount - r.paidAmount), 0) FROM RentTransactionEntity r WHERE FUNCTION('to_char', r.paymentDate, 'YYYY-MM') = :monthYear")
    BigDecimal getPendingRentForMonth(String monthYear);
    
    
    @Query("SELECT MAX(r.monthYear) FROM RentTransactionEntity r WHERE r.renterId = :renterId")
    Optional<String> findLastPaidMonthByRenter(Integer renterId);
    
    
    
}
