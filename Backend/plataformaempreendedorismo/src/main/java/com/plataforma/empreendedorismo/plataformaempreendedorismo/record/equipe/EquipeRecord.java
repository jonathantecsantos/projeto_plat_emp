package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.Ods.OdsRecord;

import java.util.List;

public record EquipeRecord(
        Long id,
        String nome,
        String linkPitch,
        List<OdsRecord> listIdOds) {

}
