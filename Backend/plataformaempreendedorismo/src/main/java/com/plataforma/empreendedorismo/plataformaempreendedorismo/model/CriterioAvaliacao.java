package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity(name="criterio_avaliacao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CriterioAvaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    private Double notaMaximaCriterio;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_formato_avaliacao")
    private FormatoAvaliacao formatoAvaliacao;

    @OneToMany(mappedBy = "criterioAvaliacao", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Subcriterio> subcriterios = new ArrayList<>();


}
