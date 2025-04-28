package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.Ods.OdsRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.instituicao.InstituicaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.tipoAtividade.TipoAtividadeRecord;

import java.util.List;

public record InscricaoRecord(
        String nomeTime,
        List<AlunoCadastroRecord> alunos,
        Long idProfessor,
        List<OdsRecord> listIdOds,
        List<TipoAtividadeRecord> tipoAtividades,
        List<InstituicaoRecord> instituicaos
) {
}
