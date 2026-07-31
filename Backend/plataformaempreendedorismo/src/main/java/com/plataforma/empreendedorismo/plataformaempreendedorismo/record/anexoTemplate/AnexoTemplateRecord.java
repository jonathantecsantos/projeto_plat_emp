package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.anexoTemplate;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.AnexoTemplate;
import util.enuns.TipoTemplate;

public record AnexoTemplateRecord(
        TipoTemplate tipoTemplate,
        Integer anoLetivo,
        String nomeArquivo,
        String caminho
) {
    public AnexoTemplateRecord(AnexoTemplate entity) {
        this(entity.getTipoTemplate(), entity.getAnoLetivo(), entity.getNomeAnexo(), entity.getCaminhoAnexo());
    }
}
