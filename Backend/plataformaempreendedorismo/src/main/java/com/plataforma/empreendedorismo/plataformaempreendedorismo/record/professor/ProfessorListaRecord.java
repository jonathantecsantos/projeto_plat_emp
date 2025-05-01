package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Professor;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.EquipeRecordRetorno;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

public record ProfessorListaRecord(
        Long id,
        String nome,
        String cpf,
        String email,
        Date dataNascimento,
        String tamanhoCamisa,
        List<EquipeRecordRetorno> equipeRecord
) {
    public ProfessorListaRecord(Professor professor) {
        this(
                professor.getId(),
                professor.getNome(),
                professor.getCpf(),
                professor.getEmail(),
                professor.getDataNascimento(),
                professor.getTamanhoCamisa(),
                professor.getEquipes() != null
                        ? professor.getEquipes().stream()
                        .map(e -> new EquipeRecordRetorno(e.getId(), e.getNome(), e.getLinkPitch()))
                        .collect(Collectors.toList())
                        : List.of()
        );
    }
}
