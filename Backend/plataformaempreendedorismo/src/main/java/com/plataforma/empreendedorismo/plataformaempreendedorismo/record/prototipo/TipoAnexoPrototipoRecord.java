package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.prototipo;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.TipoAnexoPrototipo;

public record TipoAnexoPrototipoRecord(
        Long id,
        String descricao
) {
    public TipoAnexoPrototipoRecord(TipoAnexoPrototipo tipoAnexoPrototipo){
        this(tipoAnexoPrototipo.getId(), tipoAnexoPrototipo.getDescricao());
    }
}
