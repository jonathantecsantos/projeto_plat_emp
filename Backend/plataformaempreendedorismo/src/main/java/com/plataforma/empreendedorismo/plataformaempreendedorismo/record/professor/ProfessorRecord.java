package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Professor;

import java.util.Date;
import java.util.List;

public record ProfessorRecord(
        Long id,
        String nome,
        String cpf,
        String email,
        Date dataNascimento,
        String tamanhoCamisa,
        List<Equipe> equipe,
        Boolean habilitado
) {
    public ProfessorRecord(Professor professor) {
        this(professor.getId(), professor.getNome(), professor.getCpf(), professor.getEmail(), professor.getDataNascimento(), professor.getTamanhoCamisa(), professor.getEquipes(), professor.getHabilitado());
    }
}
