package org.example.campusrecruitmentsystem.repository;

import org.example.campusrecruitmentsystem.entity.RecruitmentResult;
import org.example.campusrecruitmentsystem.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecruitmentResultRepository extends JpaRepository<RecruitmentResult, Long> {

    List<RecruitmentResult> findByStudentRollNo(String rollNo);

    List<RecruitmentResult> findByStudent(Student student);
}