package com.ovi.prescription.payload.request;

import com.ovi.prescription.domain.Gender;
import lombok.Data;
import lombok.ToString;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
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
