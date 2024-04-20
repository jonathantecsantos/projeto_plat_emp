package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.ProcessadorArquivoService;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@Slf4j
@RequestMapping(value="/api/upload", produces = {"application/json"})
public class UploadArquivoController {

    @Autowired
    private ProcessadorArquivoService processadorArquivoService;
    @PostMapping("/arquivo")
    public ResponseEntity<String> salvarArquivo(@RequestParam("file")MultipartFile file, @RequestParam String tipo){
        log.info("Recebendo o arquivo: ", file.getOriginalFilename());

        try{
            Workbook workbook = WorkbookFactory.create(file.getInputStream());

            new Thread(() -> {
                try {
                    processadorArquivoService.processarPlanilha(workbook, tipo);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            }).start();

        }catch (IOException e) {
            throw new RuntimeException(e);
        }catch (Exception e){
            log.error(e.getMessage());
        }

        return new ResponseEntity<String>(HttpStatus.OK);
    }


}
