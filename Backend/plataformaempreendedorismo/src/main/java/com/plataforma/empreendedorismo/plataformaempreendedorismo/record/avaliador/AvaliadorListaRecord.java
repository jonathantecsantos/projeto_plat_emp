package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Avaliador;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.FormatoAvaliacao;

import java.util.List;

public record AvaliadorListaRecord(
        Long id,
        String nome,
        String instituicao,
        List<FormatoAvaliacao> formatosAvaliacoes
) {
    public AvaliadorListaRecord(Avaliador avaliador){
        this(avaliador.getId(), avaliador.getNome(), avaliador.getInstituicao(), avaliador.getFormatosAvaliacoes());
    }
}
