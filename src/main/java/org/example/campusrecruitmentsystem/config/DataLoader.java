package org.example.campusrecruitmentsystem.config;

import org.example.campusrecruitmentsystem.entity.Admin;
import org.example.campusrecruitmentsystem.entity.Student;
import org.example.campusrecruitmentsystem.repository.AdminRepository;
import org.example.campusrecruitmentsystem.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;

    public DataLoader(StudentRepository studentRepository,
                      AdminRepository adminRepository) {
        this.studentRepository = studentRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public void run(String... args) {

        studentRepository.save(
                new Student("23R21A05D6","Vaishnavi" , 9.37, "CSE", false, "vaish123")
        );

        studentRepository.save(
                new Student( "23R21A05D7","Ravi", 8.6, "ECE", false, "ravi123")
        );

        // insert admin
        if (adminRepository.count() == 0) {
            adminRepository.save(new Admin("admin", "admin123"));
        }
    }
}