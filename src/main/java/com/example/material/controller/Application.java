package com.example.material.controller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import com.example.material.common.MTECommon;

@SpringBootApplication
@ComponentScan(MTECommon.STR_SCAN_PACKAGE)
public class Application {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(Application.class, args);
    }
    
}
