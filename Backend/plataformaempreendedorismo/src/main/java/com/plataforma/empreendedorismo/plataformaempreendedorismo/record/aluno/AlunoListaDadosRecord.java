package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Aluno;

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
        String nomeEquipe,
        Integer anoLetivo) {

    public AlunoListaDadosRecord(Aluno aluno) {
        this(aluno.getId(), aluno.getCpf(), aluno.getNome(), aluno.getEmail(), aluno.getTurma(),
                aluno.getIsLider(), aluno.getIsViceLider(), aluno.getDataNascimento(), aluno.getTamanhoCamisa(), 
                aluno.getEquipe() != null ? aluno.getEquipe().getNome() : null, aluno.getAnoLetivo());
    }
}