package com.ovi.prescription.payload.response;

import com.ovi.prescription.domain.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionResponse {

    private String prescriptionId;

    @Temporal(TemporalType.DATE)
    private Date prescriptionDate;

    private String patientName;

    private Integer patientAge;

    private Gender patientGender;

    private String diagnosis;

    private String medicines;

    @Temporal(TemporalType.DATE)
    private Date nextVisitDate;
}
