package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ProfessorEditarRecord(
        @NotNull
        Long id,
        String nome,
        String cpf,
        String email,
        List<Long> idEquipe
) {
}
