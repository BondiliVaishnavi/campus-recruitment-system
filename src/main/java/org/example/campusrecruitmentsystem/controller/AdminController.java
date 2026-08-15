package org.example.campusrecruitmentsystem.controller;

import org.example.campusrecruitmentsystem.entity.*;
import org.example.campusrecruitmentsystem.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.campusrecruitmentsystem.service.CsvImportService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    private CsvImportService csvImportService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/drives")
    public RecruitmentDrive createDrive(@RequestBody RecruitmentDrive drive) {
        return adminService.createRecruitmentDrive(drive);
    }
    @PutMapping("/results")
    public String updateResult(@RequestParam String company,
                               @RequestParam String rollNo,
                               @RequestParam ResultStatus status) {

        adminService.updateResult(company, rollNo, status);

        return "Result updated successfully";
    }
    @GetMapping("/dashboard")
    public AdminDashboard getDashboard() {
        return adminService.generateDashboard();
    }

    @GetMapping("/drives/{company}/selected")
    public List<RecruitmentResult> getSelectedStudents(@PathVariable String company) {
        return adminService.viewSelectedStudents(company);
    }
    @GetMapping("/students/{rollNo}")
    public Student searchStudent(@PathVariable String rollNo) {
        return adminService.searchStudent(rollNo);
    }

    @PutMapping("/drives/{company}/activate")
    public String activateDrive(@PathVariable String company) {

        adminService.activateDrive(company);

        return "Drive activated";
    }

    @PutMapping("/drives/{company}/deactivate")
    public String deactivateDrive(@PathVariable String company) {

        adminService.deactivateDrive(company);

        return "Drive deactivated";
    }
    @GetMapping("/results")
    public List<RecruitmentResult> getAllResults() {
        return adminService.getAllResults();
    }

    @PutMapping("/results/{id}")
    public RecruitmentResult updateResult(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {

        ResultStatus status = ResultStatus.valueOf(body.get("status"));

        return adminService.updateResult(id, status);
    }

    @PostMapping("/students/upload")
    public ResponseEntity<String> uploadStudents(@RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please upload a CSV file");
        }

        String result = csvImportService.importStudents(file);
        return ResponseEntity.ok(result);
    }
}