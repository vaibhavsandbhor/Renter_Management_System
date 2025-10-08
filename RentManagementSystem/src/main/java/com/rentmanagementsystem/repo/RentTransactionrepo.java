package com.rentmanagementsystem.repo;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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
    
    
    

    @Query("SELECT t FROM RentTransactionEntity t " +
           "WHERE t.monthYear = :monthYear " +
           "ORDER BY t.paymentDate ASC")
    List<RentTransactionEntity> findAllByMonthYear(@Param("monthYear") String monthYear);
    
    @Query("""
            SELECT t FROM RentTransactionEntity t 
            JOIN Renters r ON r.renterId = t.renterId
            JOIN FlatDetails f ON f.flatId = r.flat.flatId
            JOIN Wing w ON w.wingId = f.wing.wingId
            WHERE t.monthYear = :monthYear
            AND (:wingName IS NULL OR w.wingName = :wingName)
            ORDER BY t.paymentDate ASC
        """)
        List<RentTransactionEntity> findByMonthYearAndWing(
                @Param("monthYear") String monthYear,
                @Param("wingName") String wingName );

    

    // Fetch all transactions and renters for a flat
    @Query("SELECT t FROM RentTransactionEntity t JOIN FETCH t.renter WHERE t.flat.flatId = :flatId")
    List<RentTransactionEntity> findAllTransactionsByFlatId(@Param("flatId") Integer flatId);

    // Fetch transactions for a renter in a flat
    @Query("SELECT t FROM RentTransactionEntity t JOIN FETCH t.renter JOIN FETCH t.flat " +
           "WHERE t.renter.userName = :renterName AND t.flat.flatName = :flatName")
    List<RentTransactionEntity> findAllTransactionsByRenterAndFlat(@Param("renterName") String renterName,
                                                                   @Param("flatName") String flatName);
}
