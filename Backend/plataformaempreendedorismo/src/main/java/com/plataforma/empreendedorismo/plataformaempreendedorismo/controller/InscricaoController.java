package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.InscricaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.InscricaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import util.exceptions.CpfDuplicadoException;
import util.exceptions.EmailDuplicadoException;
import util.exceptions.LimiteProfessorEquipeException;

@RestController
@RequestMapping("inscricoes")
@Tag(name="Inscricao")
public class InscricaoController {

    @Autowired
    private InscricaoService inscricaoService;

    @Operation(summary = "Realizar Incrição", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Inscrição realizada com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao realizar inscrição"),
            @ApiResponse(responseCode = "409", description = "CPF ou E-mail já cadastrado na base de dados")
    })
    @SecurityRequirement(name = "bearerToken")
    @PostMapping
    public ResponseEntity<String> realizarInscricao(@RequestBody InscricaoRecord inscricaoRecord) {
        try {
            inscricaoService.processarInscricao(inscricaoRecord);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Inscrição realizada com sucesso!");
        }catch (CpfDuplicadoException | EmailDuplicadoException | LimiteProfessorEquipeException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
