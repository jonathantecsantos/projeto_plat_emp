package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor.ProfessorEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor.ProfessorRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor.ProfessorListaRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor.ProfessorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.ProfessorRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.ProfessorService;
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
@RequestMapping("professores")
@Tag(name="Professor")
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @Autowired
    private ProfessorRepository professorRepository;

    @Operation(summary = "Cadastrar Professor", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Professor cadastrado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao criar Professor")
    })
    @PostMapping(value = "/cadastrar")
    public ResponseEntity<String> cadastrarProfessor(@RequestBody ProfessorCadastroRecord professorCadastroRecord) throws Exception {

        try {
            professorService.criarProfessor(professorCadastroRecord);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Professor cadastrado com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar Professor: " + e.getMessage());
        }
    }

    @Operation(summary = "Listar todos os Professores", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados dos Professores")
    })
    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ProfessorListaRecord> listaDadosProfessores(){
        return professorRepository.findAll().stream().map(ProfessorListaRecord::new).toList();
    }

    @Operation(summary = "Buscar Professor por id", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados do Professor")
    })
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ProfessorRecord buscaProfessorPorId(@PathVariable Long id){
        return  professorService.buscarProfessorPorId(id);
    }

    @Operation(summary = "Apagar Professor", method = "DELETE")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Professor deletado com sucesso"),
            @ApiResponse(responseCode = "204", description = "Professor não encontrado")
    })
    @DeleteMapping("/apagar/{id}")
    public ResponseEntity<String> apagar (@PathVariable Long id){
        try{
            professorRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Professor apagado com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NO_CONTENT)
                    .body("Erro ao apagar Professor: " + e.getMessage());
        }
    }

    @Operation(summary = "Editar Professor", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Professor editado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao editar Professor")
    })
    @PutMapping("/editar")
    public ResponseEntity<String> editar(@RequestBody @Valid ProfessorEditarRecord professorEditarRecord){
        try {
            professorService.editarProfessor(professorEditarRecord);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Professor atualizado com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao editar Professor: " + e.getMessage());
        }

    }

}
