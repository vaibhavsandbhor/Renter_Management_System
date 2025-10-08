package com.rentmanagementsystem.entitiy;



import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "wing")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Wing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wing_id")
    private Integer wingId;

    @Column(name = "wing_name", nullable = false, length = 100)
    private String wingName;

    @Column(name = "address", columnDefinition = "text")
    private String address;

    @Column(name = "total_flat")
    private Integer totalFlat;

    @Column(name = "created_at", updatable = false, insertable = false)
    private LocalDateTime createdAt;

    // Relationship mapping: One Wing -> Many Flats
    @OneToMany(mappedBy = "wing", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<FlatDetails> flats;
}

