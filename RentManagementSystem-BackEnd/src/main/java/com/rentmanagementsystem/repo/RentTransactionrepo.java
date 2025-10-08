package com.rentmanagementsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentmanagementsystem.entitiy.RentTransactionEntity;

public interface RentTransactionrepo extends JpaRepository<RentTransactionEntity, Integer> {

}
