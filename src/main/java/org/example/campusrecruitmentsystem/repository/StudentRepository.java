package org.example.campusrecruitmentsystem.repository;

import org.example.campusrecruitmentsystem.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {

    Student findByRollNo(String rollNo);
}