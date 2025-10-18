package com.urbanloop.repository;

import com.urbanloop.model.Repartidor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RepartidorRepository extends JpaRepository<Repartidor, Long> {
    Optional<Repartidor> findByEmail(String email);
    boolean existsByEmail(String email);
}
