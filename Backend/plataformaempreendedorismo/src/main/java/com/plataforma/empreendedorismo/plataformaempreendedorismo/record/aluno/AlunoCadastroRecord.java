package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno;

public record AlunoCadastroRecord(
        String cpf,
        String email,
        String nome,
        String turma,
        Boolean isLider,
        Boolean isViceLider,
        Long idOds,
        Long idEquipe

) {
}
