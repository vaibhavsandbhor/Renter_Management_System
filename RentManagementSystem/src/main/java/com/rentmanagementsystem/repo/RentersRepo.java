package com.rentmanagementsystem.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentmanagementsystem.entitiy.FlatDetails;
import com.rentmanagementsystem.entitiy.Renters;

public interface RentersRepo extends JpaRepository<Renters, Integer> {
	List<Renters> findByIsActiveTrue();

	Optional<Renters> findByFlatAndIsActiveTrue(FlatDetails flat);

	Optional<Renters> findByRenterName(String renterName);
}
