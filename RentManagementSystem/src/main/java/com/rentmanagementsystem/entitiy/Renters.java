package com.rentmanagementsystem.entitiy;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "renters")
public class Renters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "renter_id")
    private Integer renterId;

    @ManyToOne
    @JoinColumn(name = "flat_id")
    private FlatDetails flat;

    @Column(name = "rentert_name", nullable = false, length = 100)
    private String rentertName;

    @Column(name = "mobile_no", length = 255)
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
    private Boolean isActive;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "wing_id")
    private Wing wing;

    @OneToMany(mappedBy = "renter", cascade = CascadeType.ALL)
    private List<RentTransactionEntity> transactions;
}
