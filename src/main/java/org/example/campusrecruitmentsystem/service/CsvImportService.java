package org.example.campusrecruitmentsystem.service;

import com.opencsv.CSVReader;
import org.example.campusrecruitmentsystem.entity.Student;
import org.example.campusrecruitmentsystem.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.util.List;

@Service
public class CsvImportService {

    @Autowired
    private StudentRepository studentRepository;

    public String importStudents(MultipartFile file) {

        int imported = 0;
        int skipped = 0;

        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {

            List<String[]> rows = reader.readAll();

            boolean header = true;

            for (String[] row : rows) {

                if (header) {
                    header = false;
                    continue;
                }

                if (row.length < 6) {
                    continue;
                }

                String rollNo = row[0].trim();

                if (studentRepository.existsById(rollNo)) {
                    skipped++;
                    continue;
                }

                Student student = new Student(
                        rollNo,
                        row[1].trim(),
                        Double.parseDouble(row[2].trim()),
                        row[3].trim(),
                        Boolean.parseBoolean(row[4].trim()),
                        row[5].trim()
                );

                studentRepository.save(student);
                imported++;
            }

        } catch (Exception e) {

            e.printStackTrace();
            return "Import failed: " + e.getMessage();
        }

        return "Imported " + imported + " students, skipped " + skipped + " duplicates.";
    }
}