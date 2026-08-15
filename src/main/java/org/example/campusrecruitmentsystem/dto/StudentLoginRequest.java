package org.example.campusrecruitmentsystem.dto;

public class StudentLoginRequest {

    private String rollNo;
    private String password;

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}