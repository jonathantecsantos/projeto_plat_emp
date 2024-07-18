package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoListaDadosRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AlunoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.AlunoService;
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
@RequestMapping("alunos")
@Tag(name="Aluno")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private AlunoService alunoService;

    @Operation(summary = "Listar todos os Alunos", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados do Aluno")
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<AlunoListaDadosRecord> listaDadosAlunos(){
        return alunoRepository.findAll().stream().map(AlunoListaDadosRecord::new).toList();
    }

    @Operation(summary = "Buscar aluno por id", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados dos Alunos")
    })
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public AlunoRecord buscaAlunoPorId(@PathVariable Long id){
        return  alunoService.buscarAlunoPorId(id);
    }

    @Operation(summary = "Cadastrar Aluno", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Aluno cadastrado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao criar aluno")
    })
    @PostMapping(value = "/cadastrar")
    public ResponseEntity<String> cadastrarAluno(@RequestBody AlunoCadastroRecord alunoCadastroRecord) throws Exception {

        try {
            alunoService.criarAluno(alunoCadastroRecord);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Aluno cadastrado com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar aluno: " + e.getMessage());
        }
    }

    @Operation(summary = "Apagar Aluno", method = "DELETE")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Aluno deletado com sucesso"),
            @ApiResponse(responseCode = "204", description = "Aluno não encontrado")
    })
    @DeleteMapping("/apagar/{id}")
    public ResponseEntity<String> apagar (@PathVariable Long id){
        try{
            alunoRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Aluno apagado com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body("Erro ao apagar Aluno: " + e.getMessage());
        }

    }

    @Operation(summary = "Editar Aluno", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Aluno editado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao editar aluno")
    })
    @PutMapping("/editar")
    public ResponseEntity<String> editar(@RequestBody @Valid AlunoEditarRecord alunoEditarRecord){
        try {
            alunoService.editarAluno(alunoEditarRecord);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Aluno atualizado com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao editar aluno: " + e.getMessage());
        }

    }

}
