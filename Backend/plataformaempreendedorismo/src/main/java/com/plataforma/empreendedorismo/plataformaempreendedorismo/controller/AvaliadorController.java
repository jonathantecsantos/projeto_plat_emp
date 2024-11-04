package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorListaRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AvaliadorRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.AvaliadorService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("avaliadores")
@Tag(name="Avaliador")
@SecurityRequirement(name = "bearerToken")
public class AvaliadorController {

    @Autowired
    private AvaliadorService avaliadorService;

    @Autowired
    private AvaliadorRepository avaliadorRepository;

    @Operation(summary = "Cadastrar Avaliador", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Avaliador cadastrado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao criar Avaliador")
    })
    @PostMapping(value = "/cadastrar")
    public ResponseEntity<String> cadastrarAvaliador(@RequestBody AvaliadorCadastroRecord avaliadorCadastroRecord) throws Exception {

        try {
            avaliadorService.criarAvaliador(avaliadorCadastroRecord);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Avaliador cadastrado com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar Avaliador: " + e.getMessage());
        }
    }

    @Operation(summary = "Listar todos os Avaliadores", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados dos Avaliadores")
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<AvaliadorListaRecord> listaDadosAvaliadores(){
        return avaliadorRepository.findAll().stream().map(AvaliadorListaRecord::new).toList();
    }

    @Operation(summary = "Buscar Avaliador por id", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados do Avaliador")
    })
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public AvaliadorRecord buscaAvaliadorPorId(@PathVariable Long id){
        return  avaliadorService.buscarAvaliadorPorId(id);
    }

    @Operation(summary = "Apagar Avaliador", method = "DELETE")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Avaliador deletado com sucesso"),
            @ApiResponse(responseCode = "204", description = "Avaliador não encontrado")
    })
    @DeleteMapping("/apagar/{id}")
    public ResponseEntity<String> apagar (@PathVariable Long id){
        try{
            avaliadorRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Avaliador apagado com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body("Erro ao apagar Avaliador: " + e.getMessage());
        }
    }

    @Operation(summary = "Editar Avaliador", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Avaliador editado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao editar Avaliador")
    })
    @PutMapping("/editar")
    public ResponseEntity<String> editar(@RequestBody @Valid AvaliadorEditarRecord avaliadorEditarRecord){
        try {
            avaliadorService.editarProfessor(avaliadorEditarRecord);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Avaliador atualizado com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao editar Avaliador: " + e.getMessage());
        }
    }
}
