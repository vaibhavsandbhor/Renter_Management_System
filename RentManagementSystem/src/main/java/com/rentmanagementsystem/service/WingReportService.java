package com.rentmanagementsystem.service;


import com.rentmanagementsystem.entitiy.RentTransactionEntity;
import com.rentmanagementsystem.repo.RentTransactionrepo;

import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class WingReportService {

    private final RentTransactionrepo rentRepo;

    public WingReportService(RentTransactionrepo rentRepo) {
        this.rentRepo = rentRepo;
    }

    public List<Map<String, Object>> getCurrentMonthReport() {
        String currentMonth = YearMonth.now().toString(); // e.g., "2025-10"
        List<RentTransactionEntity> transactions = rentRepo.findByMonthYear(currentMonth);

        // Group by Wing
        Map<String, List<RentTransactionEntity>> byWing = transactions.stream()
                .collect(Collectors.groupingBy(t -> t.getWing().getWingName()));

        List<Map<String, Object>> result = new ArrayList<>();

        for (var entry : byWing.entrySet()) {
            String wingName = entry.getKey();
            List<RentTransactionEntity> wingTx = entry.getValue();

            BigDecimal totalRent = wingTx.stream()
                    .map(RentTransactionEntity::getRentAmount)
                    .filter(Objects::nonNull)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal collected = wingTx.stream()
                    .map(RentTransactionEntity::getPaidAmount)
                    .filter(Objects::nonNull)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);

            BigDecimal pending = totalRent.subtract(collected);

            // Example: you can fetch totalFlats & occupancy from Wing entity
            int totalFlats = wingTx.get(0).getWing().getFlats().size();
            long occupied = wingTx.stream().map(t -> t.getFlat().getFlatId()).distinct().count();
            long vacant = totalFlats - occupied;

            Map<String, Object> report = new LinkedHashMap<>();
            report.put("wing", wingName);
            report.put("totalFlats", totalFlats);
            report.put("occupied", occupied);
            report.put("vacant", vacant);
            report.put("totalRent", totalRent);
            report.put("collected", collected);
            report.put("pending", pending);

            result.add(report);
        }

        return result;
    }
}

