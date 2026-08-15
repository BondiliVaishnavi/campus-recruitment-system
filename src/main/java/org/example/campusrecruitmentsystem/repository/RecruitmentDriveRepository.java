package org.example.campusrecruitmentsystem.repository;

import org.example.campusrecruitmentsystem.entity.RecruitmentDrive;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecruitmentDriveRepository extends JpaRepository<RecruitmentDrive, Long> {

    RecruitmentDrive findByCompanyName(String companyName);
}