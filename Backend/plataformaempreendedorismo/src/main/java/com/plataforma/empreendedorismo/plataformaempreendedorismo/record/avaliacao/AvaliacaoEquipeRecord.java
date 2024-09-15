package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliacao;

public record AvaliacaoEquipeRecord(
        Long idEquipe,
        Long idCriterioAvaliacao,
        Long idSubcriterioAvaliacao,
        Double nota,
        Long idAvaliador,
        Long idTipoAvaliacao
) {
}
