package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Instituicao;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.InstituicaoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("instituicoes")
@Tag(name="Instituicao")
public class InstituicaoController {

    @Autowired
    private InstituicaoRepository instituicaoRepository;

    @Operation(summary = "Busca Instituições", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "404", description = "Instituições não encontradas"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar Instituições"),
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Instituicao> getAll() {
        return instituicaoRepository.findByAtivoTrue();
    }
}
