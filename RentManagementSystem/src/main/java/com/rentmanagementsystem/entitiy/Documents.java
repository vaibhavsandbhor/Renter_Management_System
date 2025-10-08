package com.rentmanagementsystem.entitiy;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Documents {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doc_id")
    private Integer docId;

    // Many documents can belong to one renter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "renter_id")
    private Renters renter;

    @Column(name = "doc_type", length = 50)
    private String docType;

    @Lob
    @Basic(fetch = FetchType.LAZY)
    @Column(name = "file_data", columnDefinition = "bytea")
    private byte[] fileData;

    @Column(name = "uploaded_at", updatable = false, insertable = false)
    private LocalDateTime uploadedAt;
}
