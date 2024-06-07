package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity(name="avaliador")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Avaliador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String instituicao;

    private String nome;

    @ManyToMany
    @JoinTable(
            name = "avaliador_formato",
            joinColumns = {@JoinColumn(name = "id_avaliador", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "id_formato_avaliacao", referencedColumnName = "id")}
    )
    private List<FormatoAvaliacao> formatoAvaliacoes = new ArrayList<>();

}
