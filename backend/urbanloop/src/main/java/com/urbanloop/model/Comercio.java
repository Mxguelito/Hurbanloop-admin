package com.urbanloop.model;

import com.urbanloop.tenant.Consorcio; // si todavía no usás Consorcio, podés comentarlo
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "comercios", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Comercio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre; // nombre del comercio

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 30)
    private String telefono;

    @Column(length = 100)
    private String rubro; // ej: "Panadería", "Lavandería", "Kiosco"

    @ManyToOne(optional = true)
    @JoinColumn(name = "consorcio_id")
    private Consorcio consorcio; // 🔹 opcional por ahora
}
