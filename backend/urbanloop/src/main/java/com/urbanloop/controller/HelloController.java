package com.urbanloop.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/api/admin/hello")
    public String helloAdmin() {
        return "Hola Admin 👑 — acceso autorizado con JWT";
    }

    @GetMapping("/api/public/ping")
    public String ping() {
        return "Pong público 🟢 (sin login)";
    }
}
