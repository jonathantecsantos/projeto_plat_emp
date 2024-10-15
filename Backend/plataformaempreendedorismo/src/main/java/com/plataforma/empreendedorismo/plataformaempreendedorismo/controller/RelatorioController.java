package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.relatorio.ClassificacaoGeralTimesRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.relatorio.DatalhamentoClassificacaoFormatoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.relatorio.DetalhamentoNotasTimeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.AvaliacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("relatorios")
@Tag(name="Relatorio")
public class RelatorioController {

    @Autowired
    private AvaliacaoService avaliacaoService;
    @Operation(summary = "Buscar classificação Geral dos Times", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados")
    })
    @GetMapping(value = "/classificacao",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ClassificacaoGeralTimesRecord> getClassificao(){
        return avaliacaoService.buscarClassificacao();
    }

    @Operation(summary = "Buscar classificação dos Times por Formato", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados")
    })
    @GetMapping(value = "/classificacao-por-formato/{idFormatoAvaliacao}",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<DatalhamentoClassificacaoFormatoRecord> getClassificaoPorFormato(@PathVariable Long idFormatoAvaliacao){
        return avaliacaoService.buscarClassificacaoPorFormato(idFormatoAvaliacao);
    }

    @Operation(summary = "Buscar notas por Equipe", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados")
    })
    @GetMapping(value = "/notas-equipe/{idEquipe}",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<DetalhamentoNotasTimeRecord> getNotasPorTime(@PathVariable Long idEquipe){
        return avaliacaoService.buscarNotasPorTime(idEquipe);
    }

    @Operation(summary = "Itens do Relatório", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados")
    })
    @GetMapping(value = "/itens-relatorio",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ItensRelatorioRecord> getRelatorioGeral(){
        return avaliacaoService.buscarItensDoRelatorio();
    }

}
