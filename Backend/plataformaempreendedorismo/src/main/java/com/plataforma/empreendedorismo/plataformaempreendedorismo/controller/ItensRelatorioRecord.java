package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.SubcriterioAvaliacao;

public record ItensRelatorioRecord(
        Long idSubcriterio,
        String descricaoSubcriterio,
        String descricaoCriterio,
        Integer ordemRelatorio
) {

    public ItensRelatorioRecord(SubcriterioAvaliacao subcriterioAvaliacao){
        this(subcriterioAvaliacao.getId(),subcriterioAvaliacao.getDescricao(),subcriterioAvaliacao.getCriterioAvaliacao().getDescricao(),subcriterioAvaliacao.getOrdemRelatorio());
    }
}
