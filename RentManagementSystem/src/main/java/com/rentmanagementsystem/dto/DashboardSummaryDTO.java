package com.rentmanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class DashboardSummaryDTO {
    private BigDecimal pendingRent;
    private BigDecimal collectedThisMonth;
    private BigDecimal totalDeposits;
    private Long totalRenters;
    private Double occupancyRate;
}