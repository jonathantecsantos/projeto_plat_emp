package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoListaDadosRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AlunoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.AlunoService;
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
@RequestMapping("alunos")
@Tag(name="Alunos")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private AlunoService alunoService;

    @Operation(summary = "Lista os dados do Aluno", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados do Aluno")
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<AlunoListaDadosRecord> listaDadosAluno(){
        return alunoRepository.findAll().stream().map(AlunoListaDadosRecord::new).toList();
    }

    @Operation(summary = "Cadastra Aluno", method = "POST")
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

}
