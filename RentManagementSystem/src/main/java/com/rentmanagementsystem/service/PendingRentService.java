package com.rentmanagementsystem.service;

import com.rentmanagementsystem.dto.PendingRentDTO;
import com.rentmanagementsystem.entitiy.Renters;
import com.rentmanagementsystem.repo.RentTransactionrepo;
import com.rentmanagementsystem.repo.RentersRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PendingRentService {

    private final RentersRepo renterRepo;
    private final RentTransactionrepo txnRepo;

    public List<PendingRentDTO> getPendingRentDetails() {
        List<Renters> renters = renterRepo.findByIsActiveTrue();
        List<PendingRentDTO> pendingList = new ArrayList<>();

        YearMonth currentMonth = YearMonth.now();

        for (Renters renter : renters) {
            String lastPaidMonthStr = txnRepo.findLastPaidMonthByRenter(renter.getRenterId()).orElse(null);

            // If renter never paid any rent
            if (lastPaidMonthStr == null) {
                long monthsDue = calculateMonthsBetween(renter.getMoveInDate(), LocalDate.now());
                if (monthsDue <= 0) continue;

                BigDecimal dueAmount = renter.getFlat().getMonthlyRent()
                        .multiply(BigDecimal.valueOf(monthsDue));

                pendingList.add(new PendingRentDTO(
                        renter.getRenterName(),
                        renter.getFlat().getFlatName(),
                        (int) monthsDue,
                        dueAmount,
                        "Never Paid"
                ));
            } else {
                YearMonth lastPaidMonth = YearMonth.parse(lastPaidMonthStr);
                long monthsDue = ChronoUnit.MONTHS.between(lastPaidMonth.plusMonths(1), currentMonth.plusMonths(1));

                if (monthsDue > 0) {
                    BigDecimal dueAmount = renter.getFlat().getMonthlyRent()
                            .multiply(BigDecimal.valueOf(monthsDue));

                    pendingList.add(new PendingRentDTO(
                            renter.getRenterName(),
                            renter.getFlat().getFlatName(),
                            (int) monthsDue,
                            dueAmount,
                            lastPaidMonth.toString()
                    ));
                }
            }
        }

        return pendingList;
    }

    private long calculateMonthsBetween(LocalDate start, LocalDate end) {
        if (start == null) return 0;
        return ChronoUnit.MONTHS.between(
                YearMonth.from(start),
                YearMonth.from(end)
        );
    }
}
