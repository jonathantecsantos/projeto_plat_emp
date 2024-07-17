package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;

public record AlunoRecord(
        Long id,
        String cpf,
        String nome,
        String email,
        String turma,
        Boolean isLider,
        Boolean isViceLider,
        Equipe equipe) {

}
