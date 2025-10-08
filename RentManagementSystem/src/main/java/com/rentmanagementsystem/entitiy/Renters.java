package com.rentmanagementsystem.entitiy;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "renters")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Renters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "renter_id")
    private Integer renterId;

    // Many renters can belong to one flat
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flat_id")
    private FlatDetails flat;

    @OneToMany(mappedBy = "flat")
    private List<RentTransactionEntity> transactions;
    @Column(name = "rentert_name", nullable = false, length = 100)
    private String rentertName;

    @Column(name = "mobile_no", length = 10)
    private String mobileNo;


    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "deposit_amount", precision = 10, scale = 2)
    private BigDecimal depositAmount;

    @Column(name = "move_in_date")
    private LocalDate moveInDate;

    @Column(name = "move_out_date")
    private LocalDate moveOutDate;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;
}

