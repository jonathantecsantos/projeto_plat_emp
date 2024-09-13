package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.CriterioAvaliacao;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliacao.AvaliacaoEquipeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliacao.FormatoAvaliacaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaEquipesAvaliadasRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaEquipesRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.AvaliacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados da Avaliação")
    })
    @GetMapping(value = "/{idFormato}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CriterioAvaliacao> buscaAvaliacaoPorFormato(@PathVariable Long idFormato){
        return avaliacaoService.buscarAvaliacao(idFormato);
    }

    @Operation(summary = "Busca Formatos de Avaliação (DLJ, PITCH, SHARK_TANK, EXPO_DLEI", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados da Avaliação")
    })
    @GetMapping(value = "/formatos", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<FormatoAvaliacaoRecord> buscaFormatos(){
        return avaliacaoService.buscarFormatosAvaliacao();
    }

    @Operation(summary = "Avaliar Equipe", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Avaliação realizada com sucesso!"),
            @ApiResponse(responseCode = "500", description = "Erro ao Avaliar Equipe")
    })
    @PostMapping
    public ResponseEntity<String> avaliarEquipe(@RequestBody List<AvaliacaoEquipeRecord> avaliacaoEquipeRecord){

        try {
            avaliacaoService.avaliarEquipe(avaliacaoEquipeRecord);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Avaliação realizada com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao Avaliar Equipe: " + e.getMessage());
        }
    }

    @Operation(summary = "Editar Avaliação", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Avaliação Editada com sucesso!"),
            @ApiResponse(responseCode = "500", description = "Erro ao Editar Avaliação")
    })
    @PutMapping("/editar")
    public ResponseEntity<String> editarAvaliacaoEquipe(@RequestBody List<AvaliacaoEquipeRecord> avaliacaoEquipeRecord){

        try {
            avaliacaoService.editarAvaliacaoEquipe(avaliacaoEquipeRecord);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Avaliação editada com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao editar Avaliação da Equipe: " + e.getMessage());
        }
    }

    @Operation(summary = "Busca Equipes validando Avaliacao", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "404", description = "Equipes não encontradas"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar Equipes"),
    })
    @GetMapping(value = "/equipes", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<ListaEquipesAvaliadasRecord>> getEquipes(@RequestParam Long idTipoAvaliacao, @RequestParam Long idAvaliador){
        return ResponseEntity.ok(avaliacaoService.buscarEquipes(idTipoAvaliacao, idAvaliador));
    }
}
