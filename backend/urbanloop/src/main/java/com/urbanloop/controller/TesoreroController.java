package com.urbanloop.controller;

import com.urbanloop.model.Tesorero;
import com.urbanloop.repository.TesoreroRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/tesoreros")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasAnyRole('ADMIN','TESORERO')") // 🔐 Solo Admin o Tesorero
public class TesoreroController {

    private final TesoreroRepository tesoreroRepository;

    public TesoreroController(TesoreroRepository tesoreroRepository) {
        this.tesoreroRepository = tesoreroRepository;
    }

    @GetMapping
    public List<Tesorero> obtenerTodos() {
        return tesoreroRepository.findAll();
    }

    @GetMapping("/{id}")
    public Tesorero obtenerPorId(@PathVariable Long id) {
        return tesoreroRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tesorero no encontrado"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Crear: solo ADMIN
    public Tesorero crear(@RequestBody Tesorero t) {
        if (tesoreroRepository.existsByEmail(t.getEmail())) {
            throw new RuntimeException("Ya existe un tesorero con ese email");
        }
        return tesoreroRepository.save(t);
    }

    @PutMapping("/{id}")
    public Tesorero actualizar(@PathVariable Long id, @RequestBody Tesorero datos) {
        return tesoreroRepository.findById(id).map(t -> {
            t.setNombre(datos.getNombre());
            t.setEmail(datos.getEmail());
            t.setTelefono(datos.getTelefono());
            t.setCargo(datos.getCargo());
            t.setConsorcio(datos.getConsorcio());
            return tesoreroRepository.save(t);
        }).orElseThrow(() -> new RuntimeException("Tesorero no encontrado"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Borrar: solo ADMIN
    public void eliminar(@PathVariable Long id) {
        tesoreroRepository.deleteById(id);
    }
    @GetMapping("/dashboard")
@PreAuthorize("hasAnyRole('ADMIN','TESORERO')") // Solo admin o tesorero pueden acceder
public Map<String, Object> obtenerDatosDashboard() {
    Map<String, Object> data = new HashMap<>();
    data.put("totalCobrado", 250000);
    data.put("pagosPendientes", 32000);
    data.put("movimientosHoy", 12);
    return data;
}

}
