package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorListaRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador.CoordenadorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador.CoordenadorEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador.CoordenadorListaRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador.CoordenadorRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.UsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AvaliadorRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.CoordenadorRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.AvaliadorService;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.CoordenadorService;
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
@RequestMapping("coordenadores")
@Tag(name="Coordenador")
@SecurityRequirement(name = "bearerToken")
public class CoordenadorController {

    @Autowired
    private CoordenadorService coordenadorService;

    @Autowired
    private CoordenadorRepository coordenadorRepository;

    @Operation(summary = "Cadastrar Coordenador", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Coordenador cadastrado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao criar Coordenador")
    })
    @PostMapping(value = "/cadastrar")
    public ResponseEntity<Object> cadastrarCoordenador(@RequestBody CoordenadorCadastroRecord coordenadorCadastroRecord){

        try {
            UsuarioRecord usuarioRecord = coordenadorService.criarCoordenaorAndCriarAcesso(coordenadorCadastroRecord);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(usuarioRecord);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar Coordenador: " + e.getMessage());
        }
    }

    @Operation(summary = "Listar todos os Coordenadores", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados")
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<CoordenadorListaRecord> listaDadosCoordenadores(){
        return coordenadorRepository.findAll().stream().map(CoordenadorListaRecord::new).toList();
    }

    @Operation(summary = "Buscar Coordenador por id", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados")
    })
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public CoordenadorRecord buscaCoordenadorPorId(@PathVariable Long id){
        return  coordenadorService.buscarCoordenadorPorId(id);
    }

    @Operation(summary = "Apagar Coordenador", method = "DELETE")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dado deletado com sucesso"),
            @ApiResponse(responseCode = "204", description = "Dado não encontrado")
    })
    @DeleteMapping("/apagar/{id}")
    public ResponseEntity<String> apagar (@PathVariable Long id){
        try{
            coordenadorService.apagarCoordenadorAndUsuario(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Coordenador apagado com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body("Erro ao apagar Coordenador: " + e.getMessage());
        }
    }

    @Operation(summary = "Editar Coordenador", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dado editado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao editar dado")
    })
    @PutMapping("/editar")
    public ResponseEntity<String> editar(@RequestBody @Valid CoordenadorEditarRecord coordenadorEditarRecord){
        try {
            coordenadorService.editarCoordenador(coordenadorEditarRecord);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Coordenador atualizado com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao editar Coordenador: " + e.getMessage());
        }
    }
}
