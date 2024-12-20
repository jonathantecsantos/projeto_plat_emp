package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Aluno;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Ods;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Professor;

import java.util.List;

public record ListaDadosEquipeRecord(
        String nomeEquipe,
        List<Aluno> alunos,
        List<Professor> professor,
        List<Ods> odsList
) {
}
