package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor;

public record ProfessorCadastroRecord(
        String nome,
        String cpf,
        String email,
        Long idEquipe
) {
}
