package org.example.campusrecruitmentsystem.repository;

import org.example.campusrecruitmentsystem.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    Admin findByUsername(String username);
}