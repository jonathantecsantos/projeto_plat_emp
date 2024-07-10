package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;

public record ListaEquipesRecord(
        Long id,
        String nome
) {
    public ListaEquipesRecord(Equipe equipe){
        this(equipe.getId(),equipe.getNome());
    }
}
