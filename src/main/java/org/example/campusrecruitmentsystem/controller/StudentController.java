package org.example.campusrecruitmentsystem.controller;

import org.example.campusrecruitmentsystem.entity.RecruitmentDrive;
import org.example.campusrecruitmentsystem.entity.RecruitmentResult;
import org.example.campusrecruitmentsystem.entity.Student;
import org.example.campusrecruitmentsystem.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{rollNo}")
    public Student getStudent(@PathVariable String rollNo) {
        return studentService.getStudent(rollNo);
    }


    @GetMapping("/{rollNo}/drives")
    public List<RecruitmentDrive> getEligibleDrives(@PathVariable String rollNo) {

        return studentService.getEligibleDrives(rollNo);
    }
    @GetMapping("/{rollNo}/history")
    public List<RecruitmentResult> getPlacementHistory(@PathVariable String rollNo) {

        return studentService.getPlacementHistory(rollNo);
    }
}