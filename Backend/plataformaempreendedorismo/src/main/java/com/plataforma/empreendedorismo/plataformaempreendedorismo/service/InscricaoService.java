package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.*;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.Ods.OdsRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.InscricaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.instituicao.InstituicaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.tipoAtividade.TipoAtividadeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import util.exceptions.*;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@Service
public class InscricaoService {

    @Value("${upload.caminhoBase}")
    private String caminhoBase;

    @Autowired
    private EquipeRepository equipeRepository;
    @Autowired
    private OdsRepository odsRepository;
    @Autowired
    private AlunoService alunoService;
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private InstituicaoRepository instituicaoRepository;
    @Autowired
    private TipoAtividadeRepository tipoAtividadeRepository;
    @Autowired
    private ProfessorService professorService;

    @Transactional(rollbackOn = Exception.class)
    public void processarInscricao(InscricaoRecord inscricaoRecord,
                                   MultipartFile logomarcaTime,
                                   MultipartFile logomarcaParceiro1,
                                   MultipartFile logomarcaParceiro2) throws CpfDuplicadoException, EmailDuplicadoException, LimiteProfessorEquipeException, EmailUtilizadoException, CpfUtilizadoException, EquipeDuplicadoException, IOException, AlunoJaInscritoNoAnoAtualException {

        validaEmailDuplicadoNaEntrada(inscricaoRecord.alunos());
        validaCpfDuplicadoNaEntrada(inscricaoRecord.alunos());
        professorService.validaLimiteDeProfessorEmEquipes(inscricaoRecord.idProfessor());

        Equipe equipe = equipeRepository.findByNome(inscricaoRecord.nomeTime().toUpperCase());
        if (equipe == null) {
            equipe = new Equipe();
            equipe.setNome(inscricaoRecord.nomeTime().toUpperCase());
            equipe.setAno(java.time.LocalDate.now().getYear());

            String fileNameTime = saveFile(logomarcaTime, "logo_time");
            String fileNameParceiro1 = saveFile(logomarcaParceiro1, "logo_parceiro1");
            String fileNameParceiro2 = saveFile(logomarcaParceiro2, "logo_parceiro2");

            equipe.setLogomarcaTime(fileNameTime);
            equipe.setNomeParceiro1(inscricaoRecord.nomeParceiro1());
            equipe.setLogomarcaParceiro1(fileNameParceiro1);
            equipe.setNomeParceiro2(inscricaoRecord.nomeParceiro2());
            equipe.setLogomarcaParceiro2(fileNameParceiro2);

            processaOds(inscricaoRecord, equipe);
            processaAtividades(inscricaoRecord, equipe);
            processaInstituicoes(inscricaoRecord, equipe);

            equipeRepository.saveAndFlush(equipe);
            processaProfessor(inscricaoRecord, equipe);
        }else{
            throw new EquipeDuplicadoException("O nome da Equipe já se encontra cadastrado: " + inscricaoRecord.nomeTime());
        }

        for (AlunoCadastroRecord alunoCadastroRecordRecord : inscricaoRecord.alunos()) {
            alunoService.persistirAlunoAndCriarAcesso(alunoCadastroRecordRecord, equipe);
        }
    }

    private void processaProfessor(InscricaoRecord inscricaoRecord, Equipe equipe) {
        Optional<Professor> professorRecuperado = professorRepository.findById(inscricaoRecord.idProfessor());
        if (professorRecuperado.isPresent()) {
            Professor professor = professorRecuperado.get();
            professor.getEquipes().add(equipe);
            professorRepository.save(professor);
        }
    }

    private void processaInstituicoes(InscricaoRecord inscricaoRecord, Equipe equipe) {
        if(inscricaoRecord.instituicoes() != null && !inscricaoRecord.instituicoes().isEmpty()){
            List<Instituicao> instituicaoList = new ArrayList<>();
            for(InstituicaoRecord instituicaoRecord : inscricaoRecord.instituicoes()){
                instituicaoRepository.findById(instituicaoRecord.id())
                        .ifPresent(instituicaoList::add);
            }
            equipe.setInstituicoes(instituicaoList);
        }
    }

    private void processaAtividades(InscricaoRecord inscricaoRecord, Equipe equipe) {
        if(inscricaoRecord.tipoAtividades() != null && !inscricaoRecord.tipoAtividades().isEmpty()){
            List<TipoAtividade> tipoAtividadeList = new ArrayList<>();
            for(TipoAtividadeRecord tipoAtividadeRecord : inscricaoRecord.tipoAtividades()){
                tipoAtividadeRepository.findById(tipoAtividadeRecord.id())
                        .ifPresent(tipoAtividadeList::add);
            }
            equipe.setTipoAtividades(tipoAtividadeList);
        }
    }

    private void processaOds(InscricaoRecord inscricaoRecord, Equipe equipe) {
        if (inscricaoRecord.listIdOds() != null && !inscricaoRecord.listIdOds().isEmpty()) {
            List<Ods> odsList = new ArrayList<>();
            for (OdsRecord ods : inscricaoRecord.listIdOds()) {
                odsRepository.findById(ods.id()).ifPresent(odsList::add);
            }
            equipe.setOdsList(odsList);
        }
    }

    private void validaCpfDuplicadoNaEntrada(List<AlunoCadastroRecord> listAlunos) throws CpfDuplicadoException {
        Set<String> cpfsVistos = new HashSet<>();
        for(AlunoCadastroRecord alunoDto : listAlunos){
            if (!cpfsVistos.add(alunoDto.cpf())) {
                throw new CpfDuplicadoException("CPF duplicado encontrado no preenchimento: " + alunoDto.cpf());
            }
        }
    }

    private void validaEmailDuplicadoNaEntrada(List<AlunoCadastroRecord> listAlunos) throws EmailDuplicadoException {
        Set<String> emailsVistos = new HashSet<>();
        for(AlunoCadastroRecord alunoDto : listAlunos){
            if (!emailsVistos.add(alunoDto.email())) {
                throw new EmailDuplicadoException("E-mail duplicado encontrado no preenchimento: " + alunoDto.email());
            }
        }
    }

    private String saveFile(MultipartFile file, String prefix) throws IOException {
        if (file == null || file.isEmpty()) {
            return null;
        }

        String randomUUID = UUID.randomUUID().toString();
        String originalFilename = file.getOriginalFilename();
        String extensao = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extensao = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String fileName = prefix + "_" + randomUUID + extensao;

        Path uploadPath = Paths.get(caminhoBase);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        try (InputStream inputStream = file.getInputStream()) {
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
        }

        return fileName;
    }

}
