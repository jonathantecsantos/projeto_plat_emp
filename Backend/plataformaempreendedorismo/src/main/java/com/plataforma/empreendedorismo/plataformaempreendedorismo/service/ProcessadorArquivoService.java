package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.*;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AlunoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.EquipeRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.OdsRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
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
    private AlunoRepository alunoRepository;

    @Autowired
    private OdsRepository odsRepository;

    @Autowired
    private EquipeRepository equipeRepository;

    @PersistenceContext
    private EntityManager entityManager;


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

        Equipe equipe = new Equipe();

        if(row.getCell(0) != null){
            String equipeEncontrada = String.valueOf(row.getCell(0));
            equipe.setNome(equipeEncontrada);
        }

        equipeRepository.save(equipe);
    }

    @Transactional
    public void processarAluno(Row row) throws Exception {

        log.info("Iniciando processamento de Alunos");

        Aluno aluno = new Aluno();

        if(row.getCell(0) != null){
            String cpf = String.valueOf(row.getCell(0));
            if(validarCPF(cpf)){
                aluno.setCpf(cpf);
            }else{
                System.out.printf("Erro CPF");
            }
        }

        if(row.getCell(1) != null){
            String valueNome = String.valueOf(row.getCell(1));
            aluno.setNome(valueNome.toUpperCase());
        }

        if(row.getCell(2) != null){
            String email = String.valueOf(row.getCell(2));
            aluno.setEmail(email);
        }

        if(row.getCell(3) != null){
            String turma = String.valueOf(row.getCell(3));
            aluno.setTurma(turma);
        }

        if(row.getCell(4) != null){
            String isLider = String.valueOf(row.getCell(4));

            if (isLider.equals("SIM")){
                aluno.setIsLider(true);
            }else{
                aluno.setIsLider(false);
            }
        }

        if(row.getCell(5) != null){
            String isViceLider = String.valueOf(row.getCell(5));

            if (isViceLider.equals("SIM")){
                aluno.setIsViceLider(true);
            }else{
                aluno.setIsViceLider(false);
            }
        }

        if(row.getCell(6) != null){
            String ods = String.valueOf(row.getCell(6));

            Ods odsEncontradado = odsRepository.findByCodigo(ods);
            if (odsEncontradado != null){
                aluno.setOds(odsEncontradado);
            }else{
                throw new Exception("Erro");
            }
        }

        Equipe equipe = new Equipe();

        if(row.getCell(7) != null) {
            String entradaEquipe = String.valueOf(row.getCell(7));
            equipe = equipeRepository.findByNome(entradaEquipe);
            if (equipe == null) {
                equipe = new Equipe();
                equipe.setNome(entradaEquipe.toUpperCase());
                equipeRepository.saveAndFlush(equipe);
                aluno.setEquipe(equipe);
            }else{
                aluno.setEquipe(equipe);
            }
        }

        alunoRepository.save(aluno);
    }

    private boolean validarCPF(String cpf) {

        if(!cpf.isEmpty() || !cpf.isBlank()){
            if(cpf.length() == 11){
                return true;
            }else{
                System.out.printf("Quantidade de digitos inválida");
                return false;
            }
        }else{
            System.out.printf("Campo vazio");
            return false;
        }
    }

    private boolean validarHeader(Row headerRow, TipoImportacao tipoImportacao) {

        String [] expectedHeader = {};


        switch (tipoImportacao){
            case GRUPO:
                expectedHeader = new String[]{
                        "NOME_EQUIPE"
                };
                break;
            case ALUNO:
                expectedHeader = new String[]{
                        "CPF","NOME_ALUNO", "EMAIL", "TURMA","LIDER", "VICE-LIDER", "ODS","EQUIPE"
                };
                break;
            case AVALIADOR:
                expectedHeader = new String[]{
                        "NOME_AVALIADOR", "EQUIPE"
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
