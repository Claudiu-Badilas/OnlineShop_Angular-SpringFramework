package com.example.backend.exception.model;

public class EmailExistException extends Exception {
    public EmailExistException(String message) {
        super(message);
    }
}
