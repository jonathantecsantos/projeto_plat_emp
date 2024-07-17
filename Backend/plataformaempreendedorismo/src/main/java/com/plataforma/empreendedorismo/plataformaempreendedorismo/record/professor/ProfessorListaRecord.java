package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Professor;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.EquipeRecord;

public record ProfessorListaRecord(
        Long id,
        String nome,
        String cpf,
        String email,
        EquipeRecord equipeRecord
) {
    public ProfessorListaRecord(Professor professor){
        this(professor.getId(),professor.getNome(), professor.getCpf(), professor.getEmail(),
                new EquipeRecord(professor.getEquipe().getId(), professor.getEquipe().getNome(), professor.getEquipe().getLinkPitch()));
    }
}
