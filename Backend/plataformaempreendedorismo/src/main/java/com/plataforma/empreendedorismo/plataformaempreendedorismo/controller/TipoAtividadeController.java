package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.TipoAtividade;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.TipoAtividadeRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("atividades")
@Tag(name="Tipo Atividade")
public class TipoAtividadeController {
    @Autowired
    private TipoAtividadeRepository tipoAtividadeRepository;

    @Operation(summary = "Lista todas as atividades ativas", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Atividades encontradas com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar atividades"),
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TipoAtividade>> listarAtividadesAtivas() {
        List<TipoAtividade> atividades = tipoAtividadeRepository.findByAtivoTrue();
        return ResponseEntity.ok(atividades);
    }
}
