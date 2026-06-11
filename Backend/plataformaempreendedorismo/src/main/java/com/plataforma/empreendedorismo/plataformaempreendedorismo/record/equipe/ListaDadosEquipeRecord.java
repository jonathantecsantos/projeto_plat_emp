package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.*;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.instituicao.InstituicaoRecord;

import java.util.List;

public record ListaDadosEquipeRecord(
        String nomeEquipe,
        Integer ano,
        List<Aluno> alunos,
        List<Professor> professores,
        List<Ods> odsList,
        String linkPitch,
        List<TipoAtividade> tipoAtividades,
        List<Instituicao> instituicoes,
        String logomarcaTime,
        String nomeParceiro1,
        String logomarcaParceiro1,
        String nomeParceiro2,
        String logomarcaParceiro2
) {
}
