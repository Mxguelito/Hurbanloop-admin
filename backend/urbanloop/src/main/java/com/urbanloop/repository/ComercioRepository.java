package com.urbanloop.repository;

import com.urbanloop.model.Comercio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ComercioRepository extends JpaRepository<Comercio, Long> {
    Optional<Comercio> findByEmail(String email);
    boolean existsByEmail(String email);
}
