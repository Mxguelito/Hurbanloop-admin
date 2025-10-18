package com.urbanloop.controller;

import com.urbanloop.model.Portero;
import com.urbanloop.repository.PorteroRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/porteros")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasAnyRole('ADMIN','PORTERO')") // 🔐 Solo Admin o Portero
public class PorteroController {

    private final PorteroRepository porteroRepository;

    public PorteroController(PorteroRepository porteroRepository) {
        this.porteroRepository = porteroRepository;
    }

    @GetMapping
    public List<Portero> obtenerTodos() {
        return porteroRepository.findAll();
    }

    @GetMapping("/{id}")
    public Portero obtenerPorId(@PathVariable Long id) {
        return porteroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Portero no encontrado"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Crear: solo ADMIN
    public Portero crear(@RequestBody Portero p) {
        if (porteroRepository.existsByEmail(p.getEmail())) {
            throw new RuntimeException("Ya existe un portero con ese email");
        }
        return porteroRepository.save(p);
    }

    @PutMapping("/{id}")
    public Portero actualizar(@PathVariable Long id, @RequestBody Portero datos) {
        return porteroRepository.findById(id).map(p -> {
            p.setNombre(datos.getNombre());
            p.setEmail(datos.getEmail());
            p.setTelefono(datos.getTelefono());
            p.setTurno(datos.getTurno());
            p.setConsorcio(datos.getConsorcio());
            return porteroRepository.save(p);
        }).orElseThrow(() -> new RuntimeException("Portero no encontrado"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Borrar: solo ADMIN
    public void eliminar(@PathVariable Long id) {
        porteroRepository.deleteById(id);
    }
    @GetMapping("/dashboard")
@PreAuthorize("hasRole('PORTERO')")
public Map<String, Object> obtenerDatosDashboard() {
    Map<String, Object> data = new HashMap<>();
    data.put("visitasDelDía", 15);
    data.put("paquetesPendientes", 4);
    data.put("avisosImportantes", 3);
    data.put("turnosRegistrados", 2);
    return data;
}

}
