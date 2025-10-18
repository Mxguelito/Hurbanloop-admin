package com.urbanloop.controller;

import com.urbanloop.model.Repartidor;
import com.urbanloop.repository.RepartidorRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

import java.util.List;

@RestController
@RequestMapping("/repartidores")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasAnyRole('ADMIN','REPARTIDOR')") // 🔐 Solo Admin o Repartidor
public class RepartidorController {

    private final RepartidorRepository repartidorRepository;

    public RepartidorController(RepartidorRepository repartidorRepository) {
        this.repartidorRepository = repartidorRepository;
    }

    @GetMapping
    public List<Repartidor> obtenerTodos() {
        return repartidorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Repartidor obtenerPorId(@PathVariable Long id) {
        return repartidorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Repartidor no encontrado"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Crear: solo ADMIN
    public Repartidor crear(@RequestBody Repartidor r) {
        if (repartidorRepository.existsByEmail(r.getEmail())) {
            throw new RuntimeException("Ya existe un repartidor con ese email");
        }
        return repartidorRepository.save(r);
    }

    @PutMapping("/{id}")
    public Repartidor actualizar(@PathVariable Long id, @RequestBody Repartidor datos) {
        return repartidorRepository.findById(id).map(r -> {
            r.setNombre(datos.getNombre());
            r.setEmail(datos.getEmail());
            r.setTelefono(datos.getTelefono());
            r.setEmpresa(datos.getEmpresa());
            r.setConsorcio(datos.getConsorcio());
            return repartidorRepository.save(r);
        }).orElseThrow(() -> new RuntimeException("Repartidor no encontrado"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Borrar: solo ADMIN
    public void eliminar(@PathVariable Long id) {
        repartidorRepository.deleteById(id);
    }
    @GetMapping("/dashboard")
@PreAuthorize("hasRole('REPARTIDOR')")
public Map<String, Object> obtenerDatosDashboard() {
    Map<String, Object> data = new HashMap<>();
    data.put("entregasHoy", 22);
    data.put("entregasPendientes", 3);
    data.put("calificacionPromedio", 4.8);
    data.put("ingresosDelDía", 16500);
    return data;
}

}
