package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.*;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.instituicao.InstituicaoRecord;

import java.util.List;

public record ListaDadosEquipeRecord(
        String nomeEquipe,
        List<Aluno> alunos,
        List<Professor> professores,
        List<Ods> odsList,
        String linkPitch,
        List<TipoAtividade> tipoAtividades,
        List<Instituicao> instituicoes
) {
}
