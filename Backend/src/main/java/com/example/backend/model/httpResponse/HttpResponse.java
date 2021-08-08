package com.example.backend.model.httpResponse;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class HttpResponse {
    private int httpStatusCode;
    private HttpStatus httpStatus;
    private String response;
    private String message;

    public HttpResponse() {}

    public HttpResponse(int httpStatusCode, HttpStatus httpStatus, String response, String message) {
        this.httpStatusCode = httpStatusCode;
        this.httpStatus = httpStatus;
        this.response = response;
        this.message = message;
    }

}
