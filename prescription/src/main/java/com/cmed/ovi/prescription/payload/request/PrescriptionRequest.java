package com.cmed.ovi.prescription.payload.request;

import com.cmed.ovi.prescription.domain.Admin;
import com.cmed.ovi.prescription.domain.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.ToString;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@ToString
public class PrescriptionRequest {

    @Temporal(TemporalType.DATE)
    @NotNull(message = "Prescription date is required")
    private Date prescriptionDate;

    @NotNull(message = "Patient Name is required")
    private String patientName;

    @NotNull(message = "Patient Age is required")
    private Integer patientAge;

    @NotNull(message = "Patient Gender is required")
    private Gender patientGender;

    private String diagnosis;

    private String medicines;

    @Temporal(TemporalType.DATE)
    private Date nextVisitDate;
    @NotNull(message = "Admin Id is required")

    private String adminId;
}
