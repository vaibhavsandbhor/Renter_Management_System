package com.rentmanagementsystem.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionHistoryDTO {
    private LocalDate date;
    private String renterName;
    private String flat;
    private String wing;
    private String type;
    private String method;
    private BigDecimal amount;
    private String status;
}
