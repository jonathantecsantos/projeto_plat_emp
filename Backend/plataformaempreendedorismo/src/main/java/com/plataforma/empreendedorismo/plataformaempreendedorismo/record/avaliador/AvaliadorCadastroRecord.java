package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.FormatoAvaliacao;

import java.util.List;

public record AvaliadorCadastroRecord(
        String instituicao,
        String nome,
        String email,
        List<Long> idFormatosAvaliacoes
) {
}
