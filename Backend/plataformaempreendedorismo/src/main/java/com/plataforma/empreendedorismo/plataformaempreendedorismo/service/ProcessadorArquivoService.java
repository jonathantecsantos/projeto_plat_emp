package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Aluno;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Grupo;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Importacao;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AlunoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.GrupoRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.enuns.TipoImportacao;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Iterator;

@Service
@Slf4j
public class ProcessadorArquivoService {

    @Autowired
    private ImportacaoService importacaoService;

    @Autowired
    private GrupoRepository grupoRepository;

    @Autowired
    private AlunoRepository alunoRepository;
    public void processarPlanilha(Workbook workbook, String tipo) throws Exception {

        String nomeProcesso = "";

        TipoImportacao tipoImportacao = TipoImportacao.valueOf(tipo);

        switch (tipoImportacao){
            case GRUPO:
                nomeProcesso = String.valueOf(TipoImportacao.GRUPO);
                break;
            case ALUNO:
                nomeProcesso = String.valueOf(TipoImportacao.ALUNO);
                break;
            case AVALIADOR:
                nomeProcesso = String.valueOf(TipoImportacao.AVALIADOR);
                break;
            default:
                throw new Exception("Erro!");
        }

        LocalDateTime dataHoraAtual = LocalDateTime.now();
        Date date = java.sql.Timestamp.valueOf(dataHoraAtual);
        Importacao importacao = importacaoService.registrarImportacao(date,null,nomeProcesso,"Jonathan",false );

        try {
            Sheet sheet = workbook.getSheetAt(0);

            Row headerRow = sheet.getRow(0);

            if(!validarHeader(headerRow, tipoImportacao)){
                throw new Exception("O cabeçalho está com problema");
            }

            Iterator<Row> rowIterator = sheet.iterator();

            while(rowIterator.hasNext()){

                Row row = rowIterator.next();
                if(row.getRowNum() == 0){
                    continue;
                }

                boolean isRowEmpty = true;

                for(int i = 0; i < row.getLastCellNum(); i++){
                    Cell cell = row.getCell(i);
                    if(cell != null && cell.getCellType() != CellType.BLANK){
                        isRowEmpty = false;
                        break;
                    }
                }

                if(isRowEmpty){
                    continue;
                }

                switch (tipoImportacao){
                    case GRUPO:
                        processarGrupo(row);
                        break;
                    case ALUNO:
                        processarAluno(row);
                        break;
                    case AVALIADOR:
                        System.out.println("Processar avaliador");
                        break;
                }


            }

            LocalDateTime dataHoraFinal = LocalDateTime.now();
            Date data = java.sql.Timestamp.valueOf(dataHoraFinal);
            importacao.setDataFim(data);
            importacaoService.atualizarHoraFinalImportacao(importacao);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }


    }

    private void processarGrupo(Row row) {

        log.info("Iniciando processamento de Grupos");

        Grupo grupo = new Grupo();

        String campoPlanilha = "NOME_GRUPO";
        if(row.getCell(0) != null){
            String valueGrupo = String.valueOf(row.getCell(0));
            grupo.setNome(valueGrupo);

        }

        grupoRepository.save(grupo);
    }
    private void processarAluno(Row row) throws Exception {

        log.info("Iniciando processamento de Alunos");

        Aluno aluno = new Aluno();

        //"NOME_ALUNO"
        if(row.getCell(0) != null){
            String valueNome = String.valueOf(row.getCell(0));
            aluno.setNome(valueNome);

        }

        //"GRUPO"
        if(row.getCell(0) != null){
            String valueGrupo = String.valueOf(row.getCell(0));

            Grupo grupo = grupoRepository.findByNome(valueGrupo);
            if (grupo != null){
                aluno.setGrupo(grupo);
            }else{
                throw new Exception("Erro");
            }
        }

        alunoRepository.save(aluno);
    }

    private boolean validarHeader(Row headerRow, TipoImportacao tipoImportacao) {

        String [] expectedHeader = {};


        switch (tipoImportacao){
            case GRUPO:
                expectedHeader = new String[]{
                        "NOME_GRUPO"
                };
                break;
            case ALUNO:
                expectedHeader = new String[]{
                        "NOME_ALUNO", "GRUPO"
                };
                break;
            case AVALIADOR:
                expectedHeader = new String[]{
                        "NOME_AVALIADOR", "GRUPO"
                };
                break;
        }


        if(headerRow == null || headerRow.getLastCellNum() != expectedHeader.length){
            return false;
        }

        for (int i = 0; i < expectedHeader.length; i++) {
            Cell cell = headerRow.getCell(i);
            String cellHeaderValue = cell.getStringCellValue().toLowerCase().trim();
            String cellExcpectedHeader = expectedHeader[i].toLowerCase().trim();

            if(cell == null || !(cellHeaderValue.equals(cellExcpectedHeader))){
                return false;
            }
        }

        return true;
    }
}
