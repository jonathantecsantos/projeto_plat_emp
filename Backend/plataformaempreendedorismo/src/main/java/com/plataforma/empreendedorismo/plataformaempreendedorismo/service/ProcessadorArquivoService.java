package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.*;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador.CoordenadorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor.ProfessorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.*;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.enuns.TipoImportacaoEnum;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Slf4j
public class ProcessadorArquivoService {

    @Autowired
    private ImportacaoService importacaoService;

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private OdsRepository odsRepository;

    @Autowired
    private EquipeRepository equipeRepository;

    @Autowired
    private FormatoAvaliacaoRepository formatoAvaliacaoRepository;

    @Autowired
    private ProfessorService professorService;

    @Autowired
    private CoordenadorService coordenadorService;

    @Autowired
    private AvaliadorService avaliadorService;

    @Autowired
    private AdministradorRepository administradorRepository;
    public void processarPlanilha(Workbook workbook, String tipo, Long idUsuario) throws Exception {

        String nomeProcesso = "";

        TipoImportacaoEnum tipoImportacaoEnum = TipoImportacaoEnum.valueOf(tipo);

        nomeProcesso = switch (tipoImportacaoEnum) {
            case EQUIPE -> String.valueOf(TipoImportacaoEnum.EQUIPE);
            case ALUNO -> String.valueOf(TipoImportacaoEnum.ALUNO);
            case AVALIADOR -> String.valueOf(TipoImportacaoEnum.AVALIADOR);
            case PROFESSOR -> String.valueOf(TipoImportacaoEnum.PROFESSOR);
            case COORDENADOR -> String.valueOf(TipoImportacaoEnum.COORDENADOR);
            default -> throw new Exception("Erro!");
        };

        LocalDateTime dataHoraAtual = LocalDateTime.now();
        Date date = Timestamp.valueOf(dataHoraAtual);
        Optional<Administrador> administrador = administradorRepository.findById(idUsuario);
        Importacao importacao = importacaoService.registrarImportacao(date,null,nomeProcesso,administrador.get().getNome(),false );

        try {
            Sheet sheet = workbook.getSheetAt(0);

            Row headerRow = sheet.getRow(0);

            if(!validarHeader(headerRow, tipoImportacaoEnum)){
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

                switch (tipoImportacaoEnum) {
                    case EQUIPE -> processarImportacaoEquipe(row);
                    case ALUNO -> processarImportacaoAluno(row);
                    case AVALIADOR -> processarImportacaoAvaliador(row);
                    case PROFESSOR -> processarImportacaoProfessor(row);
                    case COORDENADOR -> processarImportacaoCoordenador(row);
                }

            }

            LocalDateTime dataHoraFinal = LocalDateTime.now();
            Date data = Timestamp.valueOf(dataHoraFinal);
            importacao.setDataFim(data);
            importacaoService.atualizarHoraFinalImportacao(importacao);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }


    }

    private void processarImportacaoCoordenador(Row row) {
        log.info("Iniciando processamento de Coordenador");

        String nome = "";
        String cpf = "";
        String email = "";

        if(row.getCell(0) != null) {
            nome = String.valueOf(row.getCell(0));
        }

        if(row.getCell(1) != null) {
            cpf = String.valueOf(row.getCell(1));
        }

        if(row.getCell(2) != null) {
            email = String.valueOf(row.getCell(2));
        }

        CoordenadorCadastroRecord coordenadorCadastroRecord = new CoordenadorCadastroRecord(nome,cpf,email);
        coordenadorService.persistirCoordenadorAndCriarAcesso(coordenadorCadastroRecord);
    }

    private void processarImportacaoProfessor(Row row) throws Exception {
        log.info("Iniciando processamento de Professores");

        String nome = "";
        String cpf = "";
        String email = "";
        Long idEquipe = 0L;

        if(row.getCell(0) != null) {
            nome = String.valueOf(row.getCell(0));
        }

        if(row.getCell(1) != null) {
            cpf = String.valueOf(row.getCell(1));
        }

        if(row.getCell(2) != null) {
            email = String.valueOf(row.getCell(2));
        }

        if(row.getCell(3) != null) {
            String equipe = String.valueOf(row.getCell(3));

            Equipe equipeEncontrada = equipeRepository.findByNome(equipe.toUpperCase());

            if(equipeEncontrada != null){
               idEquipe = equipeEncontrada.getId();
            }
        }

        ProfessorCadastroRecord professorCadastroRecord = new ProfessorCadastroRecord(nome, cpf,email,idEquipe);
        professorService.persistirProfessorAndCriarAcesso(professorCadastroRecord);

    }

    private void processarImportacaoAvaliador(Row row) {
        log.info("Iniciando processamento de Avaliadores");

        ArrayList<FormatoAvaliacao> formatoAvaliacaos = new ArrayList<>();

        String nome = "";
        String instituicao = "";
        String email = "";
        String formatoAvaliacao = "";

        if(row.getCell(0) != null){
            nome = String.valueOf(row.getCell(0));
        }

        if(row.getCell(1) != null){
            instituicao = String.valueOf(row.getCell(1));
        }

        if(row.getCell(2) != null){
            email = String.valueOf(row.getCell(2));
        }

        if(row.getCell(3) != null){
            formatoAvaliacao = String.valueOf(row.getCell(3));
            FormatoAvaliacao formatoAvaliacaoEncontrado = formatoAvaliacaoRepository.findByDescricao(formatoAvaliacao);

            if( formatoAvaliacaoEncontrado != null){
                formatoAvaliacaos.add(formatoAvaliacaoEncontrado);
            }
        }

        AvaliadorCadastroRecord avaliadorCadastroRecord = new AvaliadorCadastroRecord(instituicao.toUpperCase(),nome.toUpperCase(),email,formatoAvaliacaos);
        avaliadorService.criarAvaliadorAndCriarAcesso(avaliadorCadastroRecord);

    }

    private void processarImportacaoEquipe(Row row) {

        log.info("Iniciando processamento de Grupos");

        Equipe equipe = new Equipe();

        if(row.getCell(0) != null){
            String equipeEncontrada = String.valueOf(row.getCell(0));
            equipe.setNome(equipeEncontrada);
        }

        equipeRepository.save(equipe);
    }
    public void processarImportacaoAluno(Row row) throws Exception {

        log.info("Iniciando processamento de Alunos");

        String cpf = "";
        String email= "";
        String nome = "";
        String turma = "";
        boolean isLider = false;
        boolean isViceLider = false;

        Equipe equipe = new Equipe();

        if (row.getCell(0) != null) {
            String valueCpf = String.valueOf(row.getCell(0));
            if(validarCPF(valueCpf)){
                cpf = valueCpf;
            }else{
                System.out.printf("Erro CPF");
            }
        } else {
            System.out.println("Cpf vazio");
        }

        if(row.getCell(1) != null){
            nome = String.valueOf(row.getCell(1));
        }

        if(row.getCell(2) != null){
            email = String.valueOf(row.getCell(2));
        }

        if(row.getCell(3) != null){
            turma = String.valueOf(row.getCell(3));
        }

        if(row.getCell(4) != null){
            String valueIsLider = String.valueOf(row.getCell(4));

            if (valueIsLider.equals("SIM")){
                isLider = true;
            }
        }

        if(row.getCell(5) != null){
            String valueIsViceLider = String.valueOf(row.getCell(5));

            if (valueIsViceLider.equals("SIM")){
                isViceLider = true;
            }
        }

        if(row.getCell(9) != null) {
            String entradaEquipe = String.valueOf(row.getCell(9));
            List<Ods> odsList = new ArrayList<>();

            equipe = equipeRepository.findByNome(entradaEquipe.toUpperCase());
            if (equipe == null) {
                equipe = new Equipe();
                equipe.setNome(entradaEquipe.toUpperCase());

                processarOds(row, odsList);

                equipe.setOdsList(odsList);
                equipeRepository.saveAndFlush(equipe);

            }else{
                processarOds(row, odsList);
                equipe.setOdsList(odsList);
                equipeRepository.saveAndFlush(equipe);
            }
        }

        AlunoCadastroRecord alunoCadastroRecord = new AlunoCadastroRecord(cpf,email,nome,turma,
                isLider,isViceLider,equipe.getId());

        alunoService.persistirAlunoAndCriarAcesso(alunoCadastroRecord,equipe);
    }

    private void processarOds(Row row, List<Ods> odsList) throws Exception {
        if(row.getCell(6) != null){
            String ods = String.valueOf(row.getCell(6));

            Ods odsEncontradado = odsRepository.findByCodigo(ods);
            if (odsEncontradado != null){
                odsList.add(odsEncontradado);
            }else{
                throw new Exception("Erro");
            }
        }
        if(row.getCell(7) != null){
            String ods = String.valueOf(row.getCell(7));

            Ods odsEncontradado = odsRepository.findByCodigo(ods);
            if (odsEncontradado != null){
                odsList.add(odsEncontradado);
            }else{
                throw new Exception("Erro");
            }
        }
        if(row.getCell(8) != null){
            String ods = String.valueOf(row.getCell(8));

            Ods odsEncontradado = odsRepository.findByCodigo(ods);
            if (odsEncontradado != null){
                odsList.add(odsEncontradado);
            }else{
                throw new Exception("Erro");
            }
        }
    }

    private boolean validarCPF(String cpf) {

        if(!cpf.isEmpty() || !cpf.isBlank()){
            if(cpf.length() == 11){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }

    private boolean validarHeader(Row headerRow, TipoImportacaoEnum tipoImportacaoEnum) {

        String [] expectedHeader = {};


        switch (tipoImportacaoEnum){
            case EQUIPE:
                expectedHeader = new String[]{
                        "NOME_EQUIPE"
                };
                break;
            case ALUNO:
                expectedHeader = new String[]{
                        "CPF","NOME_ALUNO", "EMAIL", "TURMA","LIDER", "VICE-LIDER", "ODS_1","ODS_2","ODS_3","EQUIPE"
                };
                break;
            case AVALIADOR:
                expectedHeader = new String[]{
                        "NOME_AVALIADOR", "INSTITUICAO", "EMAIL", "FORMATO_AVALIACAO"
                };
                break;
            case PROFESSOR:
                expectedHeader = new String[]{
                        "NOME_PROFESSOR", "CPF","EMAIL", "EQUIPE"
                };
                break;
            case COORDENADOR:
                expectedHeader = new String[]{
                        "NOME_COORDENADOR", "CPF","EMAIL"
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
