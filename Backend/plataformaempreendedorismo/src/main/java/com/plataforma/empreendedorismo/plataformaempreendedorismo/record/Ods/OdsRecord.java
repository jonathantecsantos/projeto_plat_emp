package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.Ods;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Ods;

public record OdsRecord(
        Long id
) {
    public OdsRecord(Ods ods){
        this(ods.getId());
    }
}
