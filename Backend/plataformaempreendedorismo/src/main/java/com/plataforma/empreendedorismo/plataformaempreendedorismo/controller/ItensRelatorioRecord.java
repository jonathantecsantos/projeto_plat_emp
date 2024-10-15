package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.SubcriterioAvaliacao;

public record ItensRelatorioRecord(
        String descricao,
        Integer ordemRelatorio
) {

    public ItensRelatorioRecord(SubcriterioAvaliacao subcriterioAvaliacao){
        this(subcriterioAvaliacao.getDescricao(),subcriterioAvaliacao.getOrdemRelatorio());
    }
}
