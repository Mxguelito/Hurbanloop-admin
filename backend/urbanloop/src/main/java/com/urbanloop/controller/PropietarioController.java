package com.urbanloop.controller;

import com.urbanloop.model.Propietario;
import com.urbanloop.repository.PropietarioRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/propietarios")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasAnyRole('ADMIN','PROPIETARIO')") // 🔐 Solo ADMIN o PROPIETARIO
public class PropietarioController {

    private final PropietarioRepository propietarioRepository;

    public PropietarioController(PropietarioRepository propietarioRepository) {
        this.propietarioRepository = propietarioRepository;
    }

    @GetMapping
    public List<Propietario> obtenerTodos() {
        return propietarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Propietario obtenerPorId(@PathVariable Long id) {
        return propietarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Propietario no encontrado"));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // Crear: solo ADMIN
    public Propietario crear(@RequestBody Propietario p) {
        if (propietarioRepository.existsByEmail(p.getEmail())) {
            throw new RuntimeException("Ya existe un propietario con ese email");
        }
        return propietarioRepository.save(p);
    }

    @PutMapping("/{id}")
    public Propietario actualizar(@PathVariable Long id, @RequestBody Propietario datos) {
        return propietarioRepository.findById(id).map(p -> {
            p.setNombre(datos.getNombre());
            p.setEmail(datos.getEmail());
            p.setTelefono(datos.getTelefono());
            p.setUnidad(datos.getUnidad());
            p.setConsorcio(datos.getConsorcio()); // si lo estás usando
            return propietarioRepository.save(p);
        }).orElseThrow(() -> new RuntimeException("Propietario no encontrado"));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Borrar: solo ADMIN
    public void eliminar(@PathVariable Long id) {
        propietarioRepository.deleteById(id);
    }
    @GetMapping("/dashboard")
@PreAuthorize("hasRole('PROPIETARIO')")
public Map<String, Object> obtenerDatosDashboard() {
    Map<String, Object> data = new HashMap<>();
    data.put("unidadesPropias", 2);
    data.put("expensasPendientes", 1);
    data.put("avisosDelConsorcio", 4);
    data.put("reservasConfirmadas", 1);
    return data;
}

}
