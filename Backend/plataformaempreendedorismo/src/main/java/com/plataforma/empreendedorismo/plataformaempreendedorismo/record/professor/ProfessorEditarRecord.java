package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor;

import jakarta.validation.constraints.NotNull;

import java.util.Date;
import java.util.List;

public record ProfessorEditarRecord(
        @NotNull
        Long id,
        String nome,
        String cpf,
        String email,
        Date dataNascimento,
        String tamanhoCamisa,
        List<Long> idEquipe
        ) {
}
