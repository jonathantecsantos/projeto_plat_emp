package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.banner.BannerRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.banner.CadastroBannerRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.prototipo.*;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.TipoAnexoPrototipoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.PrototipoService;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("prototipo")
@Tag(name="Prototipo")
public class PrototipoController {

    @Autowired
    private PrototipoService prototipoService;

    @Autowired
    private TipoAnexoPrototipoRepository tipoAnexoPrototipoRepository;
    @Operation(summary = "Cadastrar Prototipo", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Prototipo cadastrado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao criar prototipo")
    })
    @PostMapping(value = "/cadastrar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> cadastrarPrototipo(@RequestParam(required = false)  List<MultipartFile> files,
                                                     @RequestParam(required = false)  List<Long> tipoAnexoIds,
                                                     @RequestPart("cadastroPrototipoRecord") CadastroPrototipoRecord cadastroPrototipoRecord) {
        try {
            List<AnexoPrototipoRecord> anexos = new ArrayList<>();

            if (files != null && !files.isEmpty()) {
                for (int i = 0; i < files.size(); i++) {
                    Long tipoAnexoId = tipoAnexoIds.get(i);
                    MultipartFile file = files.get(i);
                    anexos.add(new AnexoPrototipoRecord(file, tipoAnexoId));
                }
            }

            prototipoService.criarPrototipo(anexos, cadastroPrototipoRecord);
            return ResponseEntity.status(HttpStatus.CREATED).body("Prototipo cadastrado com sucesso!");
        } catch (MaxUploadSizeExceededException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tamanho máximo de arquivo excedido. Por favor, envie arquivos menores.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao criar prototipo: " + e.getMessage());
        }
    }

    @Operation(summary = "Buscar tipos de Anexos do prototipo", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados")
    })
    @GetMapping(value = "/tipos-anexo",produces = MediaType.APPLICATION_JSON_VALUE)
    public List<TipoAnexoPrototipoRecord> listaTiposAnexoPrototipo(){
        return tipoAnexoPrototipoRepository.findAll().stream().map(TipoAnexoPrototipoRecord::new).toList();
    }

    @Operation(summary = "Buscar prototipo por id da Equipe", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados")
    })
    @GetMapping(value = "/{idEquipe}", produces = MediaType.APPLICATION_JSON_VALUE)
    public PrototipoRecord buscarPrototipoPorIdEquipe(@PathVariable Long idEquipe){
        return prototipoService.buscarPrototipoPorIdEquipe(idEquipe);
    }

    @Operation(summary = "Editar Prototipo", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Prototipo editado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao editar Prototipo")
    })
    @PutMapping(value = "/editar", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE,
            MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_JPEG_VALUE})
    public ResponseEntity<String> editar(@RequestParam(required = false) List<MultipartFile> files,
                                         @RequestParam(required = false) List<Long> tipoAnexoIds,
                                         @RequestPart("dtoPrototipo") EditarPrototipoRecord dtoPrototipo){


        try {
            List<AnexoPrototipoRecord> anexos = new ArrayList<>();

            if (files != null && !files.isEmpty()) {
                for (int i = 0; i < files.size(); i++) {
                    Long tipoAnexoId = tipoAnexoIds.get(i);
                    MultipartFile file = files.get(i);
                    anexos.add(new AnexoPrototipoRecord(file, tipoAnexoId));
                }
            }

            prototipoService.editarPrototipo(anexos, dtoPrototipo);
            return ResponseEntity.status(HttpStatus.OK)
                    .body("Prototipo atualizada com sucesso!");
        } catch (MaxUploadSizeExceededException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tamanho máximo de arquivo excedido. Por favor, envie arquivos menores.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao editar prototipo: " + e.getMessage());
        }

    }
}
