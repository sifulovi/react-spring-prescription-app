package com.cmed.ovi.prescription.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class LoginException extends UsernameNotFoundException {

    public LoginException(String msg) {
        super(msg);
    }

    public LoginException(String msg, Throwable t) {
        super(msg, t);
    }
}
