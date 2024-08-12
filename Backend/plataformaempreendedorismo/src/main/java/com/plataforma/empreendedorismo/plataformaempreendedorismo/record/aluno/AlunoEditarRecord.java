package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno;

import jakarta.validation.constraints.NotNull;

public record AlunoEditarRecord(
        @NotNull
        Long id,
        String cpf,
        String nome,
        String email,
        String turma,
        Boolean isLider,
        Boolean isViceLider,
        Long idEquipe
) {
}
