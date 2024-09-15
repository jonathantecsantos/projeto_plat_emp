package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.banner.CadastroBannerRecord;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity(name="banner")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Banner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "TEXTO_DESCRICAO_Q0")
    private String textoDescricaoQ0;

    @OneToMany(mappedBy = "banner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Anexo> anexos = new ArrayList<>();

    @Column(name = "EQUIPE_Q1")
    private String equipeQ1;

    @Column(name = "PARCEIRO_Q1")
    private String parceiroQ1;

    @Column(name = "ATIVIDADE_CHAVE_Q1")
    private String atividadeChaveQ1;

    @Column(name = "RECURSOS_Q1")
    private String recursosQ1;

    @Column(name = "CUSTOS_Q1")
    private String custosQ1;

    @Column(name = "OPORTUNIDADE_NEG_Q2")
    private String oportunidadeNegQ2;

    @Column(name = "CUSTO_Q2")
    private String custoQ2;

    @Column(name = "PROPOSTA_VALOR_Q2")
    private String propostaValorQ2;

    @Column(name = "FONTE_RECEITA_Q2")
    private String fonteReceitaQ2;

    @Column(name = "RESULTADO_FINANCEIRO_Q2")
    private String resultadoFinanceiroQ2;

    @Column(name = "CONTEXTO_PROBLEMA_Q3")
    private String contextoProblemaQ3;

    @Column(name = "PUBLICO_FOCO_IMPACTO_Q3")
    private String publicoFocoImpactoQ3;

    @Column(name = "INTERVENCOES_Q3")
    private String intervencoesQ3;

    @Column(name = "SAIDAS_Q3")
    private String saidasQ3;

    @Column(name = "RESULTADOS_CURTO_PRAZO_Q3")
    private String resultadosCurtoPrazoQ3;

    @Column(name = "RESULTADOS_MEDIO_PRAZO_Q3")
    private String resultadosMedioPrazoQ3;

    @Column(name = "VISAO_IMPACTO_Q3")
    private String visaoImpactoQ3;

    public Banner(CadastroBannerRecord cadastroBannerRecord, List<Anexo> anexos) {
        this.textoDescricaoQ0 = cadastroBannerRecord.textoDescricaoQ0();
        this.anexos = anexos;
        this.equipeQ1 = cadastroBannerRecord.equipeQ1();
        this.parceiroQ1 = cadastroBannerRecord.parceiroQ1();
        this.atividadeChaveQ1 = cadastroBannerRecord.atividadeChaveQ1();
        this.recursosQ1 = cadastroBannerRecord.recursosQ1();
        this.custosQ1 = cadastroBannerRecord.custosQ1();
        this.oportunidadeNegQ2 = cadastroBannerRecord.oportunidadeNegQ2();
        this.custoQ2 = cadastroBannerRecord.custoQ2();
        this.propostaValorQ2 = cadastroBannerRecord.propostaValorQ2();
        this.fonteReceitaQ2 = cadastroBannerRecord.fonteReceitaQ2();
        this.resultadoFinanceiroQ2 = cadastroBannerRecord.resultadoFinanceiroQ2();
        this.contextoProblemaQ3 = cadastroBannerRecord.contextoProblemaQ3();
        this.publicoFocoImpactoQ3 = cadastroBannerRecord.publicoFocoImpactoQ3();
        this.intervencoesQ3 = cadastroBannerRecord.intervencoesQ3();
        this.saidasQ3 = cadastroBannerRecord.saidasQ3();
        this.resultadosCurtoPrazoQ3 = cadastroBannerRecord.resultadosCurtoPrazoQ3();
        this.resultadosMedioPrazoQ3 = cadastroBannerRecord.resultadosMedioPrazoQ3();
        this.visaoImpactoQ3 = cadastroBannerRecord.visaoImpactoQ3();
    }
}
