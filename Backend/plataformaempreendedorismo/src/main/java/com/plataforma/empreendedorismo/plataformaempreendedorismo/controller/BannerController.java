package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.banner.BannerRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.banner.CadastroBannerRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.BannerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("banner")
@Tag(name="Banner")
public class BannerController {

    @Autowired
    private BannerService bannerService;
    @Operation(summary = "Cadastrar Banner", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Banner cadastrado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao criar banner")
    })
    @PostMapping(value = "/cadastrar", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,
            MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE})
    public ResponseEntity<String> cadastrarBanner(@RequestPart("files") List<MultipartFile> files,
                                                  @RequestPart("cadastroBannerRecord") CadastroBannerRecord cadastroBannerRecord) {

        try {
            bannerService.criarBanner(files,cadastroBannerRecord);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Banner cadastrado com sucesso!");

        }
        catch (MaxUploadSizeExceededException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Tamanho máximo de arquivo excedido. Por favor, envie arquivos menores.");
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao criar banner: " + e.getMessage());
        }
    }

    @Operation(summary = "Buscar banner por id da Equipe", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados do Aluno")
    })
    @GetMapping(value = "/{idEquipe}", produces = MediaType.APPLICATION_JSON_VALUE)
    public BannerRecord buscarBannerPorIdEquipe(@PathVariable Long idEquipe){
        return bannerService.buscarBannerPorIdEquipe(idEquipe);
    }

    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<String> handleMultipartException(MultipartException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Erro no upload de arquivo: " + ex.getMessage());
    }


}
