package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record AlunoCadastroRecord(
        String cpf,
        String email,
        String nome,
        String turma,
        @NotNull
        Boolean isLider,
        @NotNull
        Boolean isViceLider,
        Long idEquipe

) {
}
