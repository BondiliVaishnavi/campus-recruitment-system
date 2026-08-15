package org.example.campusrecruitmentsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class RecruitmentDrive {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String role;
    private double minimumCgpa;
    private boolean allowBacklog;

    private String pptDate;
    private String assessmentDate;
    private String expectedMonth;
    private String venue;
    private String groupLink;
    private boolean active;

    @ElementCollection
    @CollectionTable(name = "drive_branches", joinColumns = @JoinColumn(name = "drive_id"))
    @Column(name = "branch")
    private List<String> allowedBranches = new ArrayList<>();

    @OneToMany(mappedBy = "drive", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<RecruitmentResult> results = new ArrayList<>();

    public RecruitmentDrive() {
    }

    public RecruitmentDrive(String companyName,
                            String role,
                            double minimumCgpa,
                            boolean allowBacklog) {
        this.companyName = companyName;
        this.role = role;
        this.minimumCgpa = minimumCgpa;
        this.allowBacklog = allowBacklog;
    }

    public Long getId() {
        return id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public double getMinimumCgpa() {
        return minimumCgpa;
    }

    public void setMinimumCgpa(double minimumCgpa) {
        this.minimumCgpa = minimumCgpa;
    }

    public boolean isAllowBacklog() {
        return allowBacklog;
    }

    public void setAllowBacklog(boolean allowBacklog) {
        this.allowBacklog = allowBacklog;
    }

    public String getPptDate() {
        return pptDate;
    }

    public void setPptDate(String pptDate) {
        this.pptDate = pptDate;
    }

    public String getAssessmentDate() {
        return assessmentDate;
    }

    public void setAssessmentDate(String assessmentDate) {
        this.assessmentDate = assessmentDate;
    }

    public String getExpectedMonth() {
        return expectedMonth;
    }

    public void setExpectedMonth(String expectedMonth) {
        this.expectedMonth = expectedMonth;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getGroupLink() {
        return groupLink;
    }

    public void setGroupLink(String groupLink) {
        this.groupLink = groupLink;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<RecruitmentResult> getResults() {
        return results;
    }

    public void setResults(List<RecruitmentResult> results) {
        this.results = results;
    }

    public List<String> getAllowedBranches() {
        return allowedBranches;
    }

    public void setAllowedBranches(List<String> allowedBranches) {
        this.allowedBranches = allowedBranches;
    }


}
