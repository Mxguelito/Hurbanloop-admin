package com.urbanloop.repository;

import com.urbanloop.model.Portero;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PorteroRepository extends JpaRepository<Portero, Long> {
    Optional<Portero> findByEmail(String email);
    boolean existsByEmail(String email);
}
