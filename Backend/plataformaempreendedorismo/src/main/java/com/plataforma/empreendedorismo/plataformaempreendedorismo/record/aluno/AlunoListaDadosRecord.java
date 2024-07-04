package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Aluno;

public record AlunoListaDadosRecord(
        Long id,
        String cpf,
        String nome,
        String email,
        String turma,
        Boolean isLider,
        Boolean isViceLider,
        Long idEquipe,
        String nomeEquipe,
        Long idObs) {

    public AlunoListaDadosRecord(Aluno aluno) {
        this(aluno.getId(), aluno.getCpf(), aluno.getNome(), aluno.getEmail(), aluno.getTurma(),
                aluno.getIsLider(), aluno.getIsViceLider(), aluno.getEquipe().getId(),
                aluno.getEquipe().getNome(), aluno.getOds().getId());
    }
}