package com.practice.appDemo.domain.dtos;

public record ErrorResponse(int status,
                            String message,
                            String details) {



}
