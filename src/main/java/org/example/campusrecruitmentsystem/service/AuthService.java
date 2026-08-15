package org.example.campusrecruitmentsystem.service;

import org.example.campusrecruitmentsystem.entity.Admin;
import org.example.campusrecruitmentsystem.entity.Student;
import org.example.campusrecruitmentsystem.repository.AdminRepository;
import org.example.campusrecruitmentsystem.repository.StudentRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final AdminRepository adminRepository;
    private final StudentRepository studentRepository;

    public AuthService(AdminRepository adminRepository,
                       StudentRepository studentRepository) {
        this.adminRepository = adminRepository;
        this.studentRepository = studentRepository;
    }

    public boolean adminLogin(String username, String password) {

        Admin admin = adminRepository.findByUsername(username);

        return admin != null &&
                admin.getPassword().equals(password);
    }

    public Student studentLogin(String rollNo, String password) {

        Student student = studentRepository.findByRollNo(rollNo);

        if (student != null &&
                student.getPassword().equals(password)) {
            return student;
        }

        return null;
    }
}