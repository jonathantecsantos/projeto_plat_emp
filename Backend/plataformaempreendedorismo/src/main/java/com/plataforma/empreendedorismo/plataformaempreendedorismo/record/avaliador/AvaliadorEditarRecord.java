package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.FormatoAvaliacao;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record AvaliadorEditarRecord (
    @NotNull
    Long id,
    String nome,
    String instituicao,
    List<Long> idFormatosAvaliacoes
){

}
