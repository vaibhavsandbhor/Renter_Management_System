package com.rentmanagementsystem.entitiy;


import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "flat_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FlatDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flat_id")
    private Integer flatId;



    @Column(name = "flat_name", nullable = false, length = 50)
    private String flatName;

    @Column(name = "monthly_rent", precision = 10, scale = 2)
    private BigDecimal monthlyRent;

    @Column(name = "status", length = 20)
    private String status = "vacant";
    @ManyToOne
    @JoinColumn(name = "wing_id")
    private Wing wing;


    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;
}

