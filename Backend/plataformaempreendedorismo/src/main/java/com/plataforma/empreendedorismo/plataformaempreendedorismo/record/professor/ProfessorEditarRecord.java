package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor;

import jakarta.validation.constraints.NotNull;

public record ProfessorEditarRecord(
        @NotNull
        Long id,
        String nome,
        String cpf,
        String email,
        Long idEquipe
) {
}
