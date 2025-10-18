package com.urbanloop.controller;

import com.urbanloop.model.Inquilino;
import com.urbanloop.repository.InquilinoRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/inquilinos")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasAnyRole('ADMIN','INQUILINO')") // 🔐 Solo Admin o Inquilino
public class InquilinoController {

    private final InquilinoRepository inquilinoRepository;

    public InquilinoController(InquilinoRepository inquilinoRepository) {
        this.inquilinoRepository = inquilinoRepository;
    }

    @GetMapping
    public List<Inquilino> obtenerTodos() {
        return inquilinoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Inquilino obtenerPorId(@PathVariable Long id) {
        return inquilinoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inquilino no encontrado"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Crear: solo ADMIN
    public Inquilino crear(@RequestBody Inquilino i) {
        if (inquilinoRepository.existsByEmail(i.getEmail())) {
            throw new RuntimeException("Ya existe un inquilino con ese email");
        }
        return inquilinoRepository.save(i);
    }

    @PutMapping("/{id}")
    public Inquilino actualizar(@PathVariable Long id, @RequestBody Inquilino datos) {
        return inquilinoRepository.findById(id).map(i -> {
            i.setNombre(datos.getNombre());
            i.setEmail(datos.getEmail());
            i.setTelefono(datos.getTelefono());
            i.setUnidad(datos.getUnidad());
            i.setConsorcio(datos.getConsorcio());
            return inquilinoRepository.save(i);
        }).orElseThrow(() -> new RuntimeException("Inquilino no encontrado"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Borrar: solo ADMIN
    public void eliminar(@PathVariable Long id) {
        inquilinoRepository.deleteById(id);
    }
    @GetMapping("/dashboard")
@PreAuthorize("hasRole('INQUILINO')")
public Map<String, Object> obtenerDatosDashboard() {
    Map<String, Object> data = new HashMap<>();
    data.put("alquilerMensual", 120000);
    data.put("pagosPendientes", 1);
    data.put("avisosRecientes", 2);
    data.put("reclamosActivos", 1);
    return data;
}

}
