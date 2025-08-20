package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Aluno;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.EquipeNomeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.EquipeRecordRetorno;

public record AlunoListaDadosRecord(
        Long id,
        String cpf,
        String nome,
        String email,
        String turma,
        Boolean isLider,
        Boolean isViceLider,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        Date dataNascimento,
        String tamanhoCamisa,
        EquipeNomeRecord nomeEquipe) {

    public AlunoListaDadosRecord(Aluno aluno) {
        this(aluno.getId(), aluno.getCpf(), aluno.getNome(), aluno.getEmail(), aluno.getTurma(),
                aluno.getIsLider(), aluno.getIsViceLider(), aluno.getDataNascimento(), aluno.getTamanhoCamisa(), new EquipeNomeRecord(aluno.getEquipe().getNome()));
    }
}