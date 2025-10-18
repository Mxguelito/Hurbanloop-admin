package com.urbanloop.auth;

import com.urbanloop.tenant.Consorcio;
import com.urbanloop.tenant.ConsorcioRepository;
import com.urbanloop.user.Role;
import com.urbanloop.user.Usuario;
import com.urbanloop.user.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private ConsorcioRepository consorcioRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        // Crear consorcio base si no existe
        Consorcio consorcio = consorcioRepo.findById(1L).orElseGet(() -> {
            Consorcio c = new Consorcio();
            c.setNombre("Consorcio Central");
            return consorcioRepo.save(c);
        });

        crearUsuario("Admin", "a@loop.com", "admin123", Role.ADMIN, consorcio);
        crearUsuario("Tesorero", "t@loop.com", "tesorero123", Role.TESORERO, consorcio);
        crearUsuario("Propietario", "p@loop.com", "propietario123", Role.PROPIETARIO, consorcio);
        crearUsuario("Inquilino", "i@loop.com", "inquilino123", Role.INQUILINO, consorcio);
        crearUsuario("Portero", "r@loop.com", "portero123", Role.PORTERO, consorcio);
        crearUsuario("Comercio", "c@loop.com", "comercio123", Role.COMERCIO, consorcio);
        crearUsuario("Repartidor", "d@loop.com", "repartidor123", Role.REPARTIDOR, consorcio);
        crearUsuario("Sistema", "s@loop.com", "sistema123", Role.SISTEMA, consorcio);
    }

    private void crearUsuario(String nombre, String email, String password, Role role, Consorcio consorcio) {
        if (usuarioRepo.findByEmail(email).isEmpty()) {
            Usuario u = Usuario.builder()
                    .nombre(nombre)
                    .email(email)
                    .password(encoder.encode(password))
                    .role(role)
                    .consorcio(consorcio)
                    .activo(true)
                    .build();
            usuarioRepo.save(u);
            System.out.println("✅ Usuario creado: " + nombre + " (" + role + ")");
        } else {
            System.out.println("ℹ️ Usuario ya existe: " + email);
        }
    }
}
