package com.urbanloop.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // ✅ ACTIVAMOS CORS y desactivamos CSRF
            .cors().and()
            .csrf(csrf -> csrf.disable())

            // ✅ Configuración de rutas públicas y privadas
            .authorizeHttpRequests(auth -> auth
                // Rutas públicas (sin autenticación)
                .requestMatchers(
                    "/api/auth/login",
                    "/api/auth/register",
                    "/h2-console/**"
                ).permitAll()

                // Rutas protegidas por rol
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers("/api/tesorero/**").hasRole("TESORERO")
                .requestMatchers("/api/propietario/**").hasRole("PROPIETARIO")
                .requestMatchers("/api/inquilino/**").hasRole("INQUILINO")
                .requestMatchers("/api/portero/**").hasRole("PORTERO")
                .requestMatchers("/api/comercio/**").hasRole("COMERCIO")
                .requestMatchers("/api/repartidor/**").hasRole("REPARTIDOR")
                .requestMatchers("/api/sistema/**").hasRole("SISTEMA")

                // Cualquier otra requiere autenticación
                .anyRequest().authenticated()
            )

            // ✅ Política sin sesión (usamos JWT)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // ✅ Filtro JWT antes del UsernamePasswordAuthenticationFilter
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)

            // ✅ Permitir acceso a consola H2 (para pruebas locales)
            .headers(headers -> headers.frameOptions(frame -> frame.disable()));

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
