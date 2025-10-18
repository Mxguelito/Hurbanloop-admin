package com.urbanloop.controller;

import com.urbanloop.security.JwtUtil;
import com.urbanloop.user.Usuario;
import com.urbanloop.user.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepo;
    private final JwtUtil jwtUtil;

    // ✅ Endpoint de login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            Usuario usuario = (Usuario) authentication.getPrincipal();
            String token = jwtUtil.generateToken(usuario);

            return ResponseEntity.ok(new AuthResponse(token, usuario.getRole().name(), usuario));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).body("Credenciales inválidas o usuario no autorizado");
        }
    }
}
