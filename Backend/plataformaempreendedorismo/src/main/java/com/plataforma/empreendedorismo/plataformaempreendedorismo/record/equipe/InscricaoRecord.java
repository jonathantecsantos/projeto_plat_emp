package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.Ods.OdsRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoCadastroRecord;

import java.util.List;

public record InscricaoRecord(
        String nomeTime,
        List<AlunoCadastroRecord> alunos,
        Long idProfessor,
        List<OdsRecord> listIdOds,
        List<String> tipoAtividades,
        String instituicaoImpactoSocial
) {
}
