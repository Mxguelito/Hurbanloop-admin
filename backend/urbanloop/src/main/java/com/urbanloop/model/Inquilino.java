package com.urbanloop.model;

import com.urbanloop.tenant.Consorcio; // comentá si no lo vas a usar todavía
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "inquilinos", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Inquilino {

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
    private Consorcio consorcio; // si te da error, comentá esta línea temporalmente

    @Column(length = 20)
    private String unidad; // número de depto o referencia
}
