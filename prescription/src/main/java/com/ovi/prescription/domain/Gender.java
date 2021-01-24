package com.ovi.prescription.domain;

public enum Gender {
    MALE("Male"),
    FEMALE("Female"),

    OTHER("Other");

    public final String name;

    private Gender(String name) {
        this.name = name;
    }
}
