package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.relatorio;

public record DetalhamentoNotasTimeRecord(
        String equipe,
        String formato,
        String criterio,
        String subcriterio,
        Integer idSubcriterio,
        Double totalNota

) {
}
