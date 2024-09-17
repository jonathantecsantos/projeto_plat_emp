package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliacao;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Avaliacao;

public record AvaliacaoRecord(
        Long idCriterioAvaliacao,
        Long idSubcriterioAvaliacao,
        Double nota
) {
    public AvaliacaoRecord(Avaliacao avaliacao){
        this(avaliacao.getIdCriterioAvaliacao(),avaliacao.getIdSubcriterioAvaliacao(), avaliacao.getNota());
    }

}
