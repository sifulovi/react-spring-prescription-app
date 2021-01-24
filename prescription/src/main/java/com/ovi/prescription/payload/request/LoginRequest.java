package com.ovi.prescription.payload.request;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest {

    @Email(message = "Username needs to be an email")
    @NotBlank(message = "email is required")
    private String email;

    @NotBlank(message = "password is required")
    private String password;
}
