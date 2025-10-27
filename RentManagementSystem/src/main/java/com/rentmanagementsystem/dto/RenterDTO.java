package com.rentmanagementsystem.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor   // Generates constructor with all fields
@NoArgsConstructor    // Generates empty constructor (needed for JSON serialization)
public class RenterDTO {
    private Integer renterId;
    private String renterName;
    private String mobileNo;
    private String email;
    private BigDecimal depositAmount;
    private LocalDate moveInDate;
    private LocalDate moveOutDate;
    
      private Boolean isActive;

   private Integer flatId;
   private Integer wingId;

    private String flatName;   // from FlatDetails
    private String wingName;
    private String adharnumber;// from Wing
}
