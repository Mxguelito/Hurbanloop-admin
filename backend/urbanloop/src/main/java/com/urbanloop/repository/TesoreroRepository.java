package com.urbanloop.repository;

import com.urbanloop.model.Tesorero;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TesoreroRepository extends JpaRepository<Tesorero, Long> {
    Optional<Tesorero> findByEmail(String email);
    boolean existsByEmail(String email);
}
