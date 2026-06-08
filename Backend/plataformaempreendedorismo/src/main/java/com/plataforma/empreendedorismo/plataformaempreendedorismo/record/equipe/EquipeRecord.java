package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.Ods.OdsRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.instituicao.InstituicaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.tipoAtividade.TipoAtividadeRecord;

import java.util.List;

public record EquipeRecord(
        Long id,
        String nome,
        String linkPitch,
        List<OdsRecord> listIdOds,
        List<TipoAtividadeRecord> tipoAtividadeList,
        List<InstituicaoRecord> instituicoes,
        String nomeParceiro1,
        String nomeParceiro2){
}
