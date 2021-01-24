package com.ovi.prescription.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegistrationRequest {

    @Column(nullable = true)
    private String fullName;

    @Email(message = "Username needs to be an email")
    @NotBlank(message = "email is required")
    private String email;

    @NotBlank(message = "password is required")
    private String password;
}
