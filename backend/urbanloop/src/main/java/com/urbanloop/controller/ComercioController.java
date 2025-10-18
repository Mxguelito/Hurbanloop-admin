package com.urbanloop.controller;

import com.urbanloop.model.Comercio;
import com.urbanloop.repository.ComercioRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/comercios")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasAnyRole('ADMIN','COMERCIO')") // 🔐 Solo Admin o Comercio
public class ComercioController {

    private final ComercioRepository comercioRepository;

    public ComercioController(ComercioRepository comercioRepository) {
        this.comercioRepository = comercioRepository;
    }

    @GetMapping
    public List<Comercio> obtenerTodos() {
        return comercioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Comercio obtenerPorId(@PathVariable Long id) {
        return comercioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comercio no encontrado"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Crear: solo ADMIN
    public Comercio crear(@RequestBody Comercio c) {
        if (comercioRepository.existsByEmail(c.getEmail())) {
            throw new RuntimeException("Ya existe un comercio con ese email");
        }
        return comercioRepository.save(c);
    }

    @PutMapping("/{id}")
    public Comercio actualizar(@PathVariable Long id, @RequestBody Comercio datos) {
        return comercioRepository.findById(id).map(c -> {
            c.setNombre(datos.getNombre());
            c.setEmail(datos.getEmail());
            c.setTelefono(datos.getTelefono());
            c.setRubro(datos.getRubro());
            c.setConsorcio(datos.getConsorcio());
            return comercioRepository.save(c);
        }).orElseThrow(() -> new RuntimeException("Comercio no encontrado"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Borrar: solo ADMIN
    public void eliminar(@PathVariable Long id) {
        comercioRepository.deleteById(id);
    }
    @GetMapping("/dashboard")
@PreAuthorize("hasRole('COMERCIO')")
public Map<String, Object> obtenerDatosDashboard() {
    Map<String, Object> data = new HashMap<>();
    data.put("ventasDelDía", 18);
    data.put("pedidosPendientes", 5);
    data.put("reseñasNuevas", 3);
    data.put("ingresosTotales", 74000);
    return data;
}

}
