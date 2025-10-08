package com.rentmanagementsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class RecentPaymentDTO {
    private String renterName;
    private String flatName;
    private String paymentMode;
    private BigDecimal amount;
    private LocalDate paymentDate;
}
