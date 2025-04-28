package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Aluno;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import java.util.Date;

public record AlunoRecord(
        Long id,
        String cpf,
        String nome,
        String email,
        String turma,
        Boolean isLider,
        Boolean isViceLider,
        Date dataNascimento,
        String tamanhoCamisa,
        Equipe equipe) {

    public AlunoRecord(Aluno aluno) {
        this(aluno.getId(), aluno.getCpf(), aluno.getNome(), aluno.getEmail(), aluno.getTurma(),
                aluno.getIsLider(), aluno.getIsViceLider(),
                aluno.getDataNascimento(), aluno.getTamanhoCamisa(), aluno.getEquipe());
    }
}
