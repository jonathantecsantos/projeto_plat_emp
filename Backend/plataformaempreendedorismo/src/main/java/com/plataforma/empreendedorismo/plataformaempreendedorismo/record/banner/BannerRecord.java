package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.banner;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.AnexoBanner;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Banner;

import java.util.ArrayList;
import java.util.List;

public record BannerRecord(
        Long id,
        String textoDescricaoQ0,
        String equipeQ1,
        String parceiroQ1,
        String atividadeChaveQ1,
        String recursosQ1,
        String custosQ1,
        String oportunidadeNegQ2,
        String custoQ2,
        String propostaValorQ2,
        String fonteReceitaQ2,
        String resultadoFinanceiroQ2,
        String contextoProblemaQ3,
        String publicoFocoImpactoQ3,
        String intervencoesQ3,
        String saidasQ3,
        String resultadosCurtoPrazoQ3,
        String resultadosMedioPrazoQ3,
        String visaoImpactoQ3,
        List<AnexoBanner> anexos
) {
    public BannerRecord(Banner banner){
        this(banner.getId(), banner.getTextoDescricaoQ0(),banner.getEquipeQ1(),banner.getParceiroQ1(),
                banner.getAtividadeChaveQ1(),banner.getRecursosQ1(),banner.getCustosQ1(),banner.getOportunidadeNegQ2(),
                banner.getCustoQ2(),banner.getPropostaValorQ2(),banner.getFonteReceitaQ2(),
                banner.getResultadoFinanceiroQ2(),banner.getContextoProblemaQ3(),banner.getPublicoFocoImpactoQ3(),
                banner.getIntervencoesQ3(), banner.getSaidasQ3(), banner.getResultadosCurtoPrazoQ3(),
                banner.getResultadosMedioPrazoQ3(), banner.getVisaoImpactoQ3(),new ArrayList<>(banner.getAnexos()));

    }

}
