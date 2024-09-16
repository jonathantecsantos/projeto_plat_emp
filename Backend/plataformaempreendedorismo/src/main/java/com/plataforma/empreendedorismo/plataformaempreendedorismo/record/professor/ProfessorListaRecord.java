package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Professor;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.EquipeRecordRetorno;

public record ProfessorListaRecord(
        Long id,
        String nome,
        String cpf,
        String email,
        EquipeRecordRetorno equipeRecord
) {
    public ProfessorListaRecord(Professor professor){
        this(professor.getId(),professor.getNome(), professor.getCpf(), professor.getEmail(),
                new EquipeRecordRetorno(professor.getEquipe().getId(), professor.getEquipe().getNome(),
                        professor.getEquipe().getLinkPitch()));
    }
}
