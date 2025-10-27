package com.rentmanagementsystem.entitiy;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
@Table(name = "rent_transactions")
public class RentTransactionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "transaction_id")
    private Integer transactionId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private MasterUser user;

    @ManyToOne
    @JoinColumn(name = "renter_id")
@JsonIgnore
    private Renters renter;

    

    @ManyToOne
    @JoinColumn(name = "wing_id")
    @JsonIgnore
    private Wing wing;
    
    
    @ManyToOne
    @JoinColumn(name = "flat_id")
    @JsonIgnore
    private FlatDetails flat;

    @Column(name = "month_year", nullable = false, length = 7)
    private String monthYear; // YYYY-MM

    @Column(name = "rent_amount", precision = 10, scale = 2)
    private BigDecimal rentAmount;

    @Column(name = "paid_amount", precision = 10, scale = 2)
    private BigDecimal paidAmount;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Column(name = "payment_mode", length = 50)
    private String paymentMode;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;
}
