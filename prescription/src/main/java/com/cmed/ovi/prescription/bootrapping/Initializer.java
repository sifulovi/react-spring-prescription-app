package com.cmed.ovi.prescription.bootrapping;


import com.cmed.ovi.prescription.domain.Admin;
import com.cmed.ovi.prescription.domain.Gender;
import com.cmed.ovi.prescription.domain.Prescription;
import com.cmed.ovi.prescription.repository.AdminRepository;
import com.cmed.ovi.prescription.repository.PrescriptionRepository;
import com.cmed.ovi.prescription.util.IdUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Component
public class Initializer {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    IdUtils idUtils;

    @Autowired
    PasswordEncoder passwordEncoder;

    private static final Logger logger = LoggerFactory.getLogger(Initializer.class);

    public void userInit() throws ParseException {
        if (adminRepository.findAll().size() == 0) {
            List<Admin> adminList = new ArrayList<>();
            for (int i = 1; i < 3; i++) {
                Admin admin = Admin.builder()
                        .fullName("Admin -" + i)
                        .email("admin" + i + "@gmail.com")
                        .adminId(idUtils.generateID(5).toUpperCase())
                        .password(passwordEncoder.encode("123456" + i))
                        .prescriptions(new ArrayList<>())
                        .build();
                for (int j = 1; j < 11; j++) {
                    SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                    df.setTimeZone(TimeZone.getTimeZone("UTC"));
                    String toParse = ("2020-08-1" + i);
                    Date date = df.parse(toParse);
                    Prescription prescription = Prescription.builder()
                            .prescriptionDate(date)
                            .prescriptionId(idUtils.generateID(5).toUpperCase())
                            .diagnosis("Diagnosis" + i + j)
                            .medicines("Medicines" + i + j)
                            .nextVisitDate(date)
                            .patientAge(23 + i + j)
                            .patientGender(Gender.MALE)
                            .patientName("Patient " + i + j)
                            .build();
                    prescription.setAdmin(admin);
                }
                adminList.add(admin);
            }

            adminRepository.saveAll(adminList);
        }
    }
}
