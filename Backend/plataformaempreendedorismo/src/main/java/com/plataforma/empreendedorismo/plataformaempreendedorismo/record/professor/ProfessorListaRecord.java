package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Professor;

public record ProfessorListaRecord(
        Long id,
        String nome,
        String cpf,
        String email,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        Date dataNascimento,
        String tamanhoCamisa,
        List<String> equipeNomeRecord
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
                        .map(e -> e.getNome())
                        .collect(Collectors.toList())
                        : List.of()
        );
    }
}
