package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;

public record ListaEquipesAvaliadasRecord(
        Long id,
        String nome,
        Boolean equipeAvaliada
) {
    public ListaEquipesAvaliadasRecord(Equipe equipe){
        this(equipe.getId(),equipe.getNome(), equipe.getEquipeAvaliada());
    }
}
