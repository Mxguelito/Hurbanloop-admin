package com.urbanloop.model;

import com.urbanloop.tenant.Consorcio; // si todavía no querés relacionarlo, comentá esta línea y el campo consorcio
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "propietarios", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Propietario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 30)
    private String telefono;

    // ✅ opcional por ahora (si te complica, comentalo hasta enlazar bien Consorcio)
    @ManyToOne(optional = true)
    @JoinColumn(name = "consorcio_id")
    private Consorcio consorcio;

    // ⚙️ opcional: identificar unidad/depto dentro del consorcio
    @Column(length = 20)
    private String unidad;
}
