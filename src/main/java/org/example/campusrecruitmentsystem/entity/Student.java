package org.example.campusrecruitmentsystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Student {

    @Id
    private String rollNo;

    private String name;
    private double cgpa;
    private String branch;
    private boolean backlog;


    private String password;

    public Student() {}

    public Student(String rollNo, String name, double cgpa, String branch, boolean backlog ,  String password) {
        this.rollNo = rollNo;
        this.name = name;
        this.cgpa = cgpa;
        this.branch = branch;
        this.backlog = backlog;
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRollNo() {
        return rollNo;
    }

    public void setRollNo(String rollNo) {
        this.rollNo = rollNo;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getCgpa() {
        return cgpa;
    }

    public void setCgpa(double cgpa) {
        this.cgpa = cgpa;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public boolean isBacklog() {
        return backlog;
    }

    public void setBacklog(boolean backlog) {
        this.backlog = backlog;
    }
}