package com.rentmanagementsystem.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rentmanagementsystem.entitiy.MasterUser;

public interface MasterUserRepo extends JpaRepository<MasterUser, Integer> {

}
