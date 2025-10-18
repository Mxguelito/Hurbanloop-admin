package com.urbanloop.repository;

import com.urbanloop.model.Inquilino;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface InquilinoRepository extends JpaRepository<Inquilino, Long> {
    Optional<Inquilino> findByEmail(String email);
    boolean existsByEmail(String email);
}
