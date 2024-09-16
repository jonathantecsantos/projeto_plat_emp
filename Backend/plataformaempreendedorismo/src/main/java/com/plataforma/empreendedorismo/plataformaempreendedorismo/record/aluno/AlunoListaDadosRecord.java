package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Aluno;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.EquipeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.EquipeRecordRetorno;

public record AlunoListaDadosRecord(
        Long id,
        String cpf,
        String nome,
        String email,
        String turma,
        Boolean isLider,
        Boolean isViceLider,
        EquipeRecordRetorno equipeRecord) {

    public AlunoListaDadosRecord(Aluno aluno) {
        this(aluno.getId(), aluno.getCpf(), aluno.getNome(), aluno.getEmail(), aluno.getTurma(),
                aluno.getIsLider(), aluno.getIsViceLider(), new EquipeRecordRetorno(aluno.getEquipe().getId(), aluno.getEquipe().getNome(), aluno.getEquipe().getLinkPitch()));
    }
}