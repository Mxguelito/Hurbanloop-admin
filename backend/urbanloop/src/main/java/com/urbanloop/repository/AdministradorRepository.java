package com.urbanloop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.urbanloop.model.Administrador;

public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
}
