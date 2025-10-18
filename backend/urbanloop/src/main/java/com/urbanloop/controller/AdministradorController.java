package com.urbanloop.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

import java.util.HashMap;
import java.util.List;
import com.urbanloop.model.Administrador;
import com.urbanloop.repository.AdministradorRepository;

@RestController
@RequestMapping("/administradores")
@CrossOrigin(origins = "http://localhost:5173")
@PreAuthorize("hasRole('ADMIN')") // 🔐 solo ADMIN puede acceder
public class AdministradorController {

    private final AdministradorRepository administradorRepository;

    public AdministradorController(AdministradorRepository administradorRepository) {
        this.administradorRepository = administradorRepository;
    }

    @GetMapping
    public List<Administrador> obtenerTodos() {
        return administradorRepository.findAll();
    }

    @PostMapping
    public Administrador crearAdministrador(@RequestBody Administrador admin) {
        return administradorRepository.save(admin);
    }

    @PutMapping("/{id}")
    public Administrador actualizarAdministrador(@PathVariable Long id, @RequestBody Administrador adminActualizado) {
        return administradorRepository.findById(id).map(admin -> {
            admin.setNombre(adminActualizado.getNombre());
            admin.setEmail(adminActualizado.getEmail());
            admin.setTelefono(adminActualizado.getTelefono());
            return administradorRepository.save(admin);
        }).orElseThrow(() -> new RuntimeException("Administrador no encontrado"));
    }

    @DeleteMapping("/{id}")
    public void eliminarAdministrador(@PathVariable Long id) {
        administradorRepository.deleteById(id);
    }
 @PreAuthorize("hasRole('ADMIN')")
@GetMapping("/dashboard")
public Map<String, Object> obtenerEstadisticasDashboard() {
    Map<String, Object> data = new HashMap<>();

    // 🔢 Datos simulados (por ahora)
    data.put("users", 48); // usuarios activos
    data.put("consorcios", 3); // nuevos consorcios
    data.put("claims", 7); // reportes o reclamos pendientes
    data.put("income", 820000); // ganancias totales en ARS

    return data;
}


}
