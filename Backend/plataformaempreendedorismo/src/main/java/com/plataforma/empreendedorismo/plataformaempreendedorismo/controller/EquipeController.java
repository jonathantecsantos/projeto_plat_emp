package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.EquipeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaDadosEquipeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaEquipesRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.EquipeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("equipes")
@Tag(name="Equipe")
public class EquipeController {

    @Autowired
    private EquipeService equipeService;

    @Operation(summary = "Busca dados da Equipe", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "404", description = "Equipe não encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados da Equipe"),
    })
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ListaDadosEquipeRecord> getEquipeDTO(@PathVariable Long id) {
        try {
            ListaDadosEquipeRecord equipeDTO = equipeService.getEquipeDTO(id);
            if (equipeDTO != null) {
                return ResponseEntity.ok(equipeDTO);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @Operation(summary = "Busca Equipes", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "404", description = "Equipes não encontradas"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar Equipes"),
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ListaEquipesRecord> getEquipes(){
        return equipeService.buscarEquipes();
    }

    @Operation(summary = "Editar Equipe", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Aluno editado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao editar aluno")
    })
    @PutMapping("/editar")
    public ResponseEntity<String> editar(@RequestBody @Valid EquipeRecord equipeRecord){
        try {
            equipeService.editarEquipe(equipeRecord);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Equipe atualizada com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao editar Equipe: " + e.getMessage());
        }

    }
}

