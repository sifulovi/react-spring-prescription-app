package com.cmed.ovi.prescription.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String prescriptionId;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id", referencedColumnName = "id")
    private Admin admin;

    public void setAdmin(Admin admin) {
        this.admin = admin;
        admin.getPrescriptions().add(this);
    }
}
