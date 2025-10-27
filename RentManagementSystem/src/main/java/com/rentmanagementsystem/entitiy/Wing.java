package com.rentmanagementsystem.entitiy;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
@Table(name = "wing")
public class Wing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wing_id")
    private Integer wingId;

    @Column(name = "wing_name", nullable = false, length = 100)
    private String wingName;

    @Column(name = "address")
    private String address;

    @Column(name = "total_flat")
    private Integer totalFlat;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "wing", cascade = CascadeType.ALL)
    private List<FlatDetails> flats;

    @OneToMany(mappedBy = "wing", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Renters> renters;

    @OneToMany(mappedBy = "wing", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<RentTransactionEntity> transactions;
}
