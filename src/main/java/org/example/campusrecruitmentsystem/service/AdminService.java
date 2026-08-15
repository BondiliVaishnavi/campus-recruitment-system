package org.example.campusrecruitmentsystem.service;

import org.example.campusrecruitmentsystem.entity.*;
import org.example.campusrecruitmentsystem.repository.RecruitmentDriveRepository;
import org.example.campusrecruitmentsystem.repository.RecruitmentResultRepository;
import org.example.campusrecruitmentsystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    private final StudentRepository studentRepository;
    private final RecruitmentDriveRepository driveRepository;
    private final RecruitmentResultRepository resultRepository;

    @Autowired
    public AdminService(StudentRepository studentRepository,
                        RecruitmentDriveRepository driveRepository,
                        RecruitmentResultRepository resultRepository) {
        this.studentRepository = studentRepository;
        this.driveRepository = driveRepository;
        this.resultRepository = resultRepository;
    }

    public RecruitmentDrive createRecruitmentDrive(RecruitmentDrive drive) {

        // Save the drive first
        RecruitmentDrive savedDrive = driveRepository.save(drive);

        // Get all students from database
        List<Student> students = studentRepository.findAll();

        // Store eligible results
        List<RecruitmentResult> results = new ArrayList<>();

        for (Student student : students) {

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

            if (!branchAllowed) {
                continue;
            }

            RecruitmentResult result = new RecruitmentResult(
                    student,
                    savedDrive,
                    ResultStatus.ELIGIBLE
            );

            results.add(result);
        }

        // Save all recruitment results
        resultRepository.saveAll(results);

        // Attach results to drive
        savedDrive.setResults(results);

        return savedDrive;
    }

    public void updateResult(String companyName,
                             String rollNo,
                             ResultStatus newStatus) {

        RecruitmentDrive drive = driveRepository.findByCompanyName(companyName);

        if (drive == null) {
            throw new RuntimeException("Recruitment drive not found");
        }

        for (RecruitmentResult result : drive.getResults()) {

            if (result.getStudent().getRollNo().equalsIgnoreCase(rollNo)) {

                result.setResultStatus(newStatus);

                resultRepository.save(result);

                return;
            }
        }

        throw new RuntimeException("Student not found in this recruitment drive");
    }
    public void activateDrive(String companyName) {

        RecruitmentDrive drive = driveRepository.findByCompanyName(companyName);

        if (drive == null) {
            throw new RuntimeException("Drive not found");
        }

        drive.setActive(true);

        driveRepository.save(drive);
    }

    public void deactivateDrive(String companyName) {

        RecruitmentDrive drive = driveRepository.findByCompanyName(companyName);

        if (drive == null) {
            throw new RuntimeException("Drive not found");
        }

        drive.setActive(false);

        driveRepository.save(drive);
    }

    public AdminDashboard generateDashboard() {

        AdminDashboard dashboard = new AdminDashboard();

        dashboard.setTotalStudents(studentRepository.findAll().size());
        dashboard.setTotalDrives(driveRepository.findAll().size());

        // Count active drives
        for (RecruitmentDrive drive : driveRepository.findAll()) {
            if (drive.isActive()) {
                dashboard.setActiveDrives(dashboard.getActiveDrives() + 1);
            }
        }

        // Count results
        for (RecruitmentResult result : resultRepository.findAll()) {

            if (result.getResultStatus() == ResultStatus.SELECTED) {
                dashboard.setSelectedStudents(
                        dashboard.getSelectedStudents() + 1);

            } else if (result.getResultStatus() == ResultStatus.INTERVIEW) {
                dashboard.setInterviewStudents(
                        dashboard.getInterviewStudents() + 1);

            } else if (result.getResultStatus() == ResultStatus.NOT_SELECTED) {
                dashboard.setNotSelectedStudents(
                        dashboard.getNotSelectedStudents() + 1);
            }
        }

        return dashboard;
    }

    public List<RecruitmentResult> viewSelectedStudents(String companyName) {

        RecruitmentDrive drive = driveRepository.findByCompanyName(companyName);

        if (drive == null) {
            throw new RuntimeException("Drive not found");
        }

        List<RecruitmentResult> selectedStudents = new ArrayList<>();

        for (RecruitmentResult result : drive.getResults()) {
            if (result.getResultStatus() == ResultStatus.SELECTED) {
                selectedStudents.add(result);
            }
        }

        return selectedStudents;
    }
    public Student searchStudent(String rollNo) {

        Student student = studentRepository.findByRollNo(rollNo);

        if (student == null) {
            throw new RuntimeException("Student not found");
        }

        return student;
    }
    public List<RecruitmentResult> getAllResults() {
        return resultRepository.findAll();
    }

    public RecruitmentResult updateResult(Long id, ResultStatus status) {

        RecruitmentResult result = resultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Result not found"));

        result.setResultStatus(status);

        return resultRepository.save(result);
    }
}