package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliacao.AvaliacaoEquipeRecord;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="avaliacao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long idEquipe;

    private Long idCriterioAvaliacao;

    private Long idSubcriterioAvaliacao;

    private Double nota;

    public Avaliacao(AvaliacaoEquipeRecord avaliacaoEquipeRecord){
        this.idEquipe = avaliacaoEquipeRecord.idEquipe();
        this.idCriterioAvaliacao = avaliacaoEquipeRecord.idCriterioAvaliacao();
        this.idSubcriterioAvaliacao = avaliacaoEquipeRecord.idSubcriterioAvaliacao();
        this.nota = avaliacaoEquipeRecord.nota();
    }
}
