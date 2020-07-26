package com.cmed.ovi.prescription.repository;

import com.cmed.ovi.prescription.domain.Admin;
import com.cmed.ovi.prescription.domain.Prescription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PrescriptionRepository extends JpaRepository<Prescription, Long> {
    Boolean existsById(long id);

    Prescription findByPrescriptionId(String prescriptionId);

    List<Prescription> findAllByAdmin(Admin admin);

    List<Prescription> findAllByPrescriptionDate(@DateTimeFormat(pattern = "yyyy-MM-dd") @Param("date") Date date);

    Prescription findByPrescriptionIdAndAdmin(String prescriptionId, Admin admin);


}
