package com.ovi.prescription.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AdminEmailException extends Exception {

    public AdminEmailException(String message) {
        super(message);
    }
}
