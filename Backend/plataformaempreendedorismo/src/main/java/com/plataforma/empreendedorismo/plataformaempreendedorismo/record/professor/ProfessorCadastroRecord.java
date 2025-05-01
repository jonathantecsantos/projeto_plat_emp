package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor;

import java.util.Date;
import java.util.List;

public record ProfessorCadastroRecord(
        String nome,
        String cpf,
        String email,
        List<Long> idEquipe,
        Date dataNascimento,
        String tamanhoCamisa
) {
}

