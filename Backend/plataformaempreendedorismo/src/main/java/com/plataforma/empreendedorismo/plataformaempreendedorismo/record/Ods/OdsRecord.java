package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.Ods;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Ods;

public record OdsRecord(
        Long id,
        String codigo,
        String descricao
) {
    public OdsRecord(Ods ods){
        this(ods.getId(), ods.getCodigo(), ods.getDescricao());
    }
}
