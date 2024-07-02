package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.ListaDadosAlunoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AlunoRepository;
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
@RequestMapping("alunos")
@Tag(name="Alunos")
public class AlunoController {

    @Autowired
    private AlunoRepository alunoRepository;

    @Operation(summary = "Lista os dados do Aluno", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados do Aluno"),
    })
    @GetMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public List<ListaDadosAlunoRecord> listaDadosAluno(){
        return alunoRepository.findAll().stream().map(ListaDadosAlunoRecord::new).toList();
    }


}
