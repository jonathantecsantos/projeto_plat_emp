package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliacao;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.FormatoAvaliacao;

public record FormatoAvaliacaoRecord(
        Long id,
        String descricao
) {

    FormatoAvaliacaoRecord(FormatoAvaliacao formatoAvaliacao){
        this(formatoAvaliacao.getId(), formatoAvaliacao.getDescricao());
    }
}
