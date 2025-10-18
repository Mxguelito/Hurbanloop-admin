package com.urbanloop.model;

import com.urbanloop.tenant.Consorcio; // si todavía no querés usarlo, podés comentarlo
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "porteros", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Portero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 30)
    private String telefono;

    @ManyToOne(optional = true)
    @JoinColumn(name = "consorcio_id")
    private Consorcio consorcio; // 🔹 opcional por ahora

    @Column(length = 50)
    private String turno; // ejemplo: “mañana”, “tarde”, “noche”
}
