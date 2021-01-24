package com.ovi.prescription.payload.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
public class JWTLoginSuccessResponse {
    private String email;
    private boolean success;
    private String token;
}
