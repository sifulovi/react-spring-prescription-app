package com.cmed.ovi.prescription.payload.response;

import com.cmed.ovi.prescription.domain.Admin;
import com.cmed.ovi.prescription.domain.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
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
