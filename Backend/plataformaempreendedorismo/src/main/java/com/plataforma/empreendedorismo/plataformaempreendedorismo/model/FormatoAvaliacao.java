package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @OneToMany(mappedBy = "formatoAvaliacao", cascade = CascadeType.ALL, orphanRemoval = true)
    List<CriterioAvaliacao> criterios = new ArrayList<>();

    @JsonIgnore
    @ManyToMany (mappedBy = "formatosAvaliacoes")
    private List<Avaliador> avaliadores = new ArrayList<>();
}
