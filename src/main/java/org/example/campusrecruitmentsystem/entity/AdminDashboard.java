package org.example.campusrecruitmentsystem.entity;

public class AdminDashboard {

    private int totalStudents;
    private int totalDrives;
    private int activeDrives;
    private int selectedStudents;
    private int interviewStudents;
    private int notSelectedStudents;

    public int getTotalStudents() {
        return totalStudents;
    }

    public void setTotalStudents(int totalStudents) {
        this.totalStudents = totalStudents;
    }

    public int getTotalDrives() {
        return totalDrives;
    }

    public void setTotalDrives(int totalDrives) {
        this.totalDrives = totalDrives;
    }

    public int getActiveDrives() {
        return activeDrives;
    }

    public void setActiveDrives(int activeDrives) {
        this.activeDrives = activeDrives;
    }

    public int getSelectedStudents() {
        return selectedStudents;
    }

    public void setSelectedStudents(int selectedStudents) {
        this.selectedStudents = selectedStudents;
    }

    public int getInterviewStudents() {
        return interviewStudents;
    }

    public void setInterviewStudents(int interviewStudents) {
        this.interviewStudents = interviewStudents;
    }

    public int getNotSelectedStudents() {
        return notSelectedStudents;
    }

    public void setNotSelectedStudents(int notSelectedStudents) {
        this.notSelectedStudents = notSelectedStudents;
    }
}