package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity(name="formato_avaliacao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FormatoAvaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    @ManyToMany (mappedBy = "formatoAvaliacoes")
    private List<Avaliador> avaliadores = new ArrayList<>();
}
