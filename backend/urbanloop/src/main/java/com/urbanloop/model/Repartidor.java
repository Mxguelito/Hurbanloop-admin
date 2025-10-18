package com.urbanloop.model;

import com.urbanloop.tenant.Consorcio; // podés comentarlo si aún no lo usás
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "repartidores", uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Repartidor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(length = 30)
    private String telefono;

    @Column(length = 50)
    private String empresa; // ej: "PedidosYa", "Rappi", "Uber Eats"

    @ManyToOne(optional = true)
    @JoinColumn(name = "consorcio_id")
    private Consorcio consorcio; // 🔹 opcional por ahora
}
