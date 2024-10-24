package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity(name="tipo_evento")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TipoEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    @OneToMany(mappedBy = "tipoEvento", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Evento> eventos;
}
