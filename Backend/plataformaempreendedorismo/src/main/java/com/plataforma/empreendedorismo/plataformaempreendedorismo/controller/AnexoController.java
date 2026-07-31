package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.anexoTemplate.AnexoTemplateRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AnexoTemplateRepository;
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
@RequestMapping("anexo_template")
@Tag(name="Anexo Template")
public class AnexoController {

    @Autowired
    private AnexoTemplateRepository anexoTemplateRepository;

    @Operation(summary = "Busca anexos por ano letivo", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Templates de anexo encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar anexos"),
    })
    @GetMapping(value = "/{ano}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<AnexoTemplateRecord> getAnexosPorAno(@PathVariable Integer ano) {
        return anexoTemplateRepository.findByAnoLetivo(ano).stream()
                .map(AnexoTemplateRecord::new)
                .toList();
    }
}
