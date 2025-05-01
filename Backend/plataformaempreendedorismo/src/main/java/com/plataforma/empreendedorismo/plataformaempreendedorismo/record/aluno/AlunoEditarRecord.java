package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno;

import jakarta.validation.constraints.NotNull;

import java.util.Date;

public record AlunoEditarRecord(
        @NotNull
        Long id,
        String cpf,
        String nome,
        String email,
        String turma,
        Boolean isLider,
        Boolean isViceLider,
        Long idEquipe,
        Date dataNascimento,
        String tamanhoCamisa
) {
}
