package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.CriterioAvaliacao;
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
@RequestMapping("avaliacoes")
@Tag(name="Avaliacao")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService;

    @Operation(summary = "Buscar Avaliações por Formato de Avaliação (DLJ, PITCH, SHARK_TANK, EXPO_DLEI", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados do Avaliador")
    })
    @GetMapping(value = "/{idFormato}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CriterioAvaliacao> buscaAvaliacaoPorFormato(@PathVariable Long idFormato){
        return avaliacaoService.buscarAvaliacao(idFormato);
    }
}
