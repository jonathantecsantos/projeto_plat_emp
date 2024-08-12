package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno;

import java.util.List;

public record AlunoCadastroRecord(
        String cpf,
        String email,
        String nome,
        String turma,
        Boolean isLider,
        Boolean isViceLider,
        Long idEquipe

) {
}
