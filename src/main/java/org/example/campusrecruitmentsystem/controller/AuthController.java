package org.example.campusrecruitmentsystem.controller;

import org.example.campusrecruitmentsystem.dto.AdminLoginRequest;
import org.example.campusrecruitmentsystem.dto.StudentLoginRequest;
import org.example.campusrecruitmentsystem.entity.Student;
import org.example.campusrecruitmentsystem.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> adminLogin(@RequestBody AdminLoginRequest request) {

        boolean success = authService.adminLogin(
                request.getUsername(),
                request.getPassword()
        );

        if (success) {
            Map<String, String> response = new HashMap<>();
            response.put("role", "ADMIN");
            response.put("message", "Login successful");

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401)
                .body("Invalid username or password");
    }

    @PostMapping("/student/login")
    public ResponseEntity<?> studentLogin(@RequestBody StudentLoginRequest request) {

        Student student = authService.studentLogin(
                request.getRollNo(),
                request.getPassword()
        );

        if (student != null) {
            return ResponseEntity.ok(student);
        }

        return ResponseEntity.status(401)
                .body("Invalid roll number or password");
    }
}