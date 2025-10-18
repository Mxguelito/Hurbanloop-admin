package com.urbanloop.service;

import com.urbanloop.model.Administrador;
import com.urbanloop.repository.AdministradorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdministradorService {

    private final AdministradorRepository administradorRepository;

    public AdministradorService(AdministradorRepository administradorRepository) {
        this.administradorRepository = administradorRepository;
    }

    public List<Administrador> listarAdministradores() {
        return administradorRepository.findAll();
    }

    public Administrador guardarAdministrador(Administrador admin) {
        return administradorRepository.save(admin);
    }
}
