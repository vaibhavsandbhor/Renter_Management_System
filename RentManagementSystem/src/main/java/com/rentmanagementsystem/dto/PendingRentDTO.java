package com.rentmanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class PendingRentDTO {
    private String renterName;
    private String flatName;
    private int monthsDue;
    private BigDecimal totalDueAmount;
    private String lastPaidMonth;
}