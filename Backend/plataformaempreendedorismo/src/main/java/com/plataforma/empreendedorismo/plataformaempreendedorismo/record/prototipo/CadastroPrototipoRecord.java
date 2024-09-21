package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.prototipo;

public record CadastroPrototipoRecord(
        Long idEquipe,
        String instituicaoImpactoSocial,
        String problemaPrincipal,
        String propostaValor,
        String vantagemCompetitiva,
        String principaisNecessidades,
        String parcerias,
        String tipoApoio
) {
}
