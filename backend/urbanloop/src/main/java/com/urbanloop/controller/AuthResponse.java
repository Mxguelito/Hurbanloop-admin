package com.urbanloop.controller;

import com.urbanloop.user.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String role;
    private Usuario user;
}
