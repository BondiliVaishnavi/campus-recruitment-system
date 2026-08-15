package org.example.campusrecruitmentsystem.service;

import org.example.campusrecruitmentsystem.entity.RecruitmentDrive;
import org.example.campusrecruitmentsystem.entity.RecruitmentResult;
import org.example.campusrecruitmentsystem.entity.Student;
import org.example.campusrecruitmentsystem.repository.RecruitmentDriveRepository;
import org.example.campusrecruitmentsystem.repository.RecruitmentResultRepository;
import org.example.campusrecruitmentsystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final RecruitmentResultRepository resultRepository;
    private final RecruitmentDriveRepository driveRepository;


    @Autowired
    public StudentService(StudentRepository studentRepository,RecruitmentResultRepository resultRepository,
                          RecruitmentDriveRepository driveRepository) {

        this.studentRepository = studentRepository;
        this.resultRepository = resultRepository;
        this.driveRepository = driveRepository;
    }

    public Student getStudent(String rollNo) {
        return studentRepository.findByRollNo(rollNo);
    }



    public List<RecruitmentDrive> getEligibleDrives(String rollNo) {

        Student student = studentRepository.findByRollNo(rollNo);

        if (student == null) {
            throw new RuntimeException("Student not found");
        }

        List<RecruitmentDrive> allDrives = driveRepository.findAll();

        List<RecruitmentDrive> eligible = new ArrayList<>();

        for (RecruitmentDrive drive : allDrives) {

            if (!drive.isActive()) {
                continue;
            }

            if (student.getCgpa() < drive.getMinimumCgpa()) {
                continue;
            }

            if (student.isBacklog() && !drive.isAllowBacklog()) {
                continue;
            }

            boolean branchAllowed = false;

            for (String branch : drive.getAllowedBranches()) {

                if (branch.equalsIgnoreCase(student.getBranch())) {
                    branchAllowed = true;
                    break;
                }
            }

            if (branchAllowed) {
                eligible.add(drive);
            }
        }

        return eligible;
    }
    public List<RecruitmentResult> getPlacementHistory(String rollNo) {

        Student student = studentRepository.findByRollNo(rollNo);

        if (student == null) {
            throw new RuntimeException("Student not found");
        }

        return resultRepository.findByStudent(student);
    }
}