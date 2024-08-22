package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="subcriterio_avaliacao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Subcriterio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;

    private Double notaMaxima;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "id_criterio_avaliacao", referencedColumnName = "id")
    private CriterioAvaliacao criterioAvaliacao;

    private Boolean valorPadrao;

}
