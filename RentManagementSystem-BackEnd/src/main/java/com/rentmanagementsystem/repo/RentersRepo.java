package com.rentmanagementsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentmanagementsystem.entitiy.Renters;

public interface RentersRepo extends JpaRepository<Renters, Integer> {

}
