package org.example.campusrecruitmentsystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class RecruitmentResult {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_roll_no")
    @JsonIgnoreProperties({"password"})
    private Student student;

    @ManyToOne
    @JoinColumn(name = "drive_id")
    private RecruitmentDrive drive;

    @Enumerated(EnumType.STRING)
    private ResultStatus resultStatus;

    public RecruitmentResult() {}

    public RecruitmentResult(Student student,
                             RecruitmentDrive drive,
                             ResultStatus resultStatus) {
        this.student = student;
        this.drive = drive;
        this.resultStatus = resultStatus;
    }

    public Long getId() {
        return id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public RecruitmentDrive getDrive() {
        return drive;
    }

    public void setDrive(RecruitmentDrive drive) {
        this.drive = drive;
    }

    public ResultStatus getResultStatus() {
        return resultStatus;
    }

    public void setResultStatus(ResultStatus resultStatus) {
        this.resultStatus = resultStatus;
    }


}
