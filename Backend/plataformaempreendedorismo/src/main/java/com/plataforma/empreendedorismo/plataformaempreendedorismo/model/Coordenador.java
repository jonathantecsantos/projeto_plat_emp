package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="coordenador")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Coordenador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    @OneToOne(mappedBy = "coordenador")
    private Usuario usuario;
}
