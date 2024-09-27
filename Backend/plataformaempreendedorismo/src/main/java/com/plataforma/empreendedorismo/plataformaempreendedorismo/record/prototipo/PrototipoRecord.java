package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.prototipo;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.AnexoPrototipo;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Prototipo;

import java.util.ArrayList;
import java.util.List;

public record PrototipoRecord(
        Long id,
        String instituicaoImpactoSocial,
        String problemaPrincipal,
        String propostaValor,
        String vantagemCompetitiva,
        String principaisNecessidades,
        String parcerias,
        String tipoApoio,
        List<AnexoPrototipo> anexos
) {
    public PrototipoRecord(Prototipo prototipo){
        this(prototipo.getId(),prototipo.getInstituicaoImpactoSocial(),prototipo.getProblemaPrincipal(),
                prototipo.getPropostaValor(),prototipo.getVantagemCompetitiva(),prototipo.getPrincipaisNecessidades(),
                prototipo.getParcerias(),prototipo.getTipoApoio(),new ArrayList<>(prototipo.getAnexos()));
    }
}
