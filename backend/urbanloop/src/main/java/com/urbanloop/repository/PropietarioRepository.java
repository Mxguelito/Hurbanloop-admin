package com.urbanloop.repository;

import com.urbanloop.model.Propietario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PropietarioRepository extends JpaRepository<Propietario, Long> {
    Optional<Propietario> findByEmail(String email);
    boolean existsByEmail(String email);
}
