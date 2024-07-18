package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Professor;

public record ProfessorRecord(
        Long id,
        String nome,
        String cpf,
        String email,
        Equipe equipe
) {
    public ProfessorRecord(Professor professor) {
        this(professor.getId(), professor.getNome(), professor.getCpf(), professor.getEmail(), professor.getEquipe());
    }
}
