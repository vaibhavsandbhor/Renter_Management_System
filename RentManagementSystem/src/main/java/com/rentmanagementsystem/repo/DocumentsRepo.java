package com.rentmanagementsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentmanagementsystem.entitiy.Documents;

public interface DocumentsRepo extends JpaRepository<Documents, Integer> {

}
