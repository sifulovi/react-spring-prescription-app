package com.cmed.ovi.prescription.bootrapping;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.text.ParseException;

@Component
public class DbLoader implements CommandLineRunner {

    @Autowired
   Initializer initializer;

    @Override
    public void run(String... args) throws ParseException {
        initializer.userInit();
    }
}
