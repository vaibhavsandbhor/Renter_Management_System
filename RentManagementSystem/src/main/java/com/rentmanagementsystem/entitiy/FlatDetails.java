package com.rentmanagementsystem.entitiy;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
@Table(name = "flat_details")
public class FlatDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flat_id")
    private Integer flatId;

    @ManyToOne
    @JoinColumn(name = "wing_id")
  
    private Wing wing;

    @Column(name = "flat_name", nullable = false, length = 50)
    private String flatName;

    @Column(name = "monthly_rent", precision = 10, scale = 2)
    private BigDecimal monthlyRent;

    @Column(name = "status", length = 20)
    private String status;

    @Column(name = "is_occupied")
    private Boolean isOccupied;
    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "flat", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Renters> renters;

    @OneToMany(mappedBy = "flat", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<RentTransactionEntity> transactions;
}
