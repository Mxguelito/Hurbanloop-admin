package com.urbanloop.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/sistema")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasRole('SISTEMA')") // 🔐 Solo el rol SISTEMA puede acceder
public class SistemaController {

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> obtenerEstadoSistema() {
        Map<String, Object> estado = new HashMap<>();
        estado.put("estado", "🟢 Online");
        estado.put("mensaje", "El backend Urbanloop está operativo y protegido con JWT");
        estado.put("hora_servidor", LocalDateTime.now().toString());
        return ResponseEntity.ok(estado);
    }

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> obtenerInfoSistema() {
        Map<String, Object> info = new HashMap<>();
        info.put("version", "1.0.0");
        info.put("nombre", "Urbanloop Backend");
        info.put("seguridad", "Spring Security 6 + JWT");
        info.put("roles_activos", new String[]{"ADMIN", "TESORERO", "PROPIETARIO", "INQUILINO", "PORTERO", "COMERCIO", "REPARTIDOR", "SISTEMA"});
        return ResponseEntity.ok(info);
    }
    @GetMapping("/dashboard")
@PreAuthorize("hasRole('SISTEMA')")
public Map<String, Object> obtenerDatosDashboard() {
    Map<String, Object> data = new HashMap<>();
    data.put("serviciosActivos", 12);
    data.put("erroresDetectados", 1);
    data.put("uptime", "99.97%");
    data.put("versionActual", "v1.4.2");
    return data;
}

}
