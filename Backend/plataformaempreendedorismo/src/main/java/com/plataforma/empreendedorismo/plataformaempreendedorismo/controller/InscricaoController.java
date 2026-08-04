package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.InscricaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.CaptchaValidatorService;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.InscricaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import util.exceptions.*;

@RestController
@RequestMapping("inscricoes")
@Tag(name="Inscricao")
public class InscricaoController {
    @Autowired
    private CaptchaValidatorService captchaValidatorService;

    @Autowired
    private InscricaoService inscricaoService;

    @Operation(summary = "Realizar Incrição", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Inscrição realizada com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao realizar inscrição"),
            @ApiResponse(responseCode = "409", description = "CPF ou E-mail já cadastrado na base de dados")
    })
    @SecurityRequirement(name = "bearerToken")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> realizarInscricao(
            @RequestPart("inscricaoRecord") InscricaoRecord inscricaoRecord,
            @RequestPart(value = "logomarcaTime", required = false) MultipartFile logomarcaTime,
            @RequestPart(value = "logomarcaParceiro1", required = false) MultipartFile logomarcaParceiro1,
            @RequestPart(value = "logomarcaParceiro2", required = false) MultipartFile logomarcaParceiro2,
            @RequestHeader("X-Captcha-Token") String recaptchaToken) {
        try {
            boolean isCaptchaValid = captchaValidatorService.validateCaptcha(recaptchaToken);
            if (!isCaptchaValid) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Captcha inválido!");
            }
            
            inscricaoService.processarInscricao(inscricaoRecord, logomarcaTime, logomarcaParceiro1, logomarcaParceiro2);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Inscrição realizada com sucesso!");
        }catch (CpfDuplicadoException | EmailDuplicadoException | LimiteProfessorEquipeException |
                CpfUtilizadoException | EmailUtilizadoException | EquipeDuplicadoException |
                AlunoJaInscritoNoAnoAtualException e){
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }
}
