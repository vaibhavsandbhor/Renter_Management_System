package com.rentmanagementsystem.repo;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.rentmanagementsystem.entitiy.RentTransactionEntity;

public interface RentTransactionrepo extends JpaRepository<RentTransactionEntity, Integer> {

	@Query("SELECT COALESCE(SUM(rt.paidAmount), 0) FROM RentTransactionEntity rt WHERE rt.monthYear = :monthYear")
	BigDecimal getTotalCollectedForMonth(@Param("monthYear") String monthYear);

    // Recent payments
    @Query("SELECT r FROM RentTransactionEntity r ORDER BY r.paymentDate DESC")
    List<RentTransactionEntity> findRecentPayments();

    @Query("SELECT COALESCE(SUM(rt.rentAmount - rt.paidAmount), 0) FROM RentTransactionEntity rt WHERE rt.monthYear = :monthYear")
    BigDecimal getPendingAmountForMonth(@Param("monthYear") String monthYear);


    // Last paid month by renter
    @Query("SELECT MAX(r.monthYear) FROM RentTransactionEntity r WHERE r.renter.renterId = :renterId")
    Optional<String> findLastPaidMonthByRenter(@Param("renterId") Integer renterId);

    // All transactions by month
    @Query("SELECT t FROM RentTransactionEntity t WHERE t.monthYear = :monthYear ORDER BY t.paymentDate ASC")
    List<RentTransactionEntity> findAllByMonthYear(@Param("monthYear") String monthYear);

    // Transactions by month and wing
    @Query("""
            SELECT t FROM RentTransactionEntity t
            JOIN t.renter r
            JOIN r.flat f
            JOIN f.wing w
            WHERE t.monthYear = :monthYear
            AND (:wingName IS NULL OR w.wingName = :wingName)
            ORDER BY t.paymentDate ASC
        """)
    List<RentTransactionEntity> findByMonthYearAndWing(
            @Param("monthYear") String monthYear,
            @Param("wingName") String wingName
    );

    
    
    List<RentTransactionEntity> findByMonthYear(String monthYear);
    
    // Fetch all transactions for a flat
    @Query("SELECT t FROM RentTransactionEntity t JOIN FETCH t.renter WHERE t.flat.flatId = :flatId")
    List<RentTransactionEntity> findAllTransactionsByFlatId(@Param("flatId") Integer flatId);

    // Fetch transactions for a specific renter in a flat
    @Query("""
            SELECT t FROM RentTransactionEntity t
            JOIN FETCH t.renter
            JOIN FETCH t.flat
            WHERE t.renter.renterName = :renterName
            AND t.flat.flatName = :flatName
        """)
    List<RentTransactionEntity> findAllTransactionsByRenterAndFlat(
            @Param("renterName") String renterName,
            @Param("flatName") String flatName
    );
   

	List<RentTransactionEntity> findAllByMonthYearAndRenter_Wing_WingName(String monthYear, String wingName);
}
