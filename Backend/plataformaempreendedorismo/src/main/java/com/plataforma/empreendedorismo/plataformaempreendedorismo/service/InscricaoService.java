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
import org.springframework.stereotype.Service;
import util.exceptions.*;

import java.util.*;

@Service
public class InscricaoService {

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
    private UsuarioService usuarioService;
    @Autowired
    private ProfessorService professorService;

    @Transactional
    public void processarInscricao(InscricaoRecord inscricaoRecord) throws CpfDuplicadoException, EmailDuplicadoException, LimiteProfessorEquipeException, EmailUtilizadoException, CpfUtilizadoException {

        validaEmailDuplicadoNaEntrada(inscricaoRecord.alunos());
        validaCpfDuplicadoNaEntrada(inscricaoRecord.alunos());
        validaCpfOuEmailCadastrado(inscricaoRecord.alunos());
        professorService.validaLimiteDeProfessorEmEquipes(inscricaoRecord.idProfessor());

        Equipe equipe = equipeRepository.findByNome(inscricaoRecord.nomeTime().toUpperCase());
        if (equipe == null) {
            equipe = new Equipe();
            equipe.setNome(inscricaoRecord.nomeTime().toUpperCase());

            processaOds(inscricaoRecord, equipe);
            processaAtividades(inscricaoRecord, equipe);
            processaInstituicoes(inscricaoRecord, equipe);

            equipeRepository.saveAndFlush(equipe);

            processaProfessor(inscricaoRecord, equipe);
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

    private void validaCpfOuEmailCadastrado(List<AlunoCadastroRecord> listAlunos) throws EmailUtilizadoException, CpfUtilizadoException {
        for(AlunoCadastroRecord alunoDto : listAlunos) {
            if (alunoService.validarCpfDuplicado(alunoDto.cpf())) {
                throw new CpfUtilizadoException("Erro. O CPF: " + alunoDto.cpf() + " já se encontra cadastrado na base de dados!");
            }
            Usuario usuario = usuarioService.buscarUsuarioPorLogin(alunoDto.email());
            if (usuario != null) {
                throw new EmailUtilizadoException("Erro. E-mail " + alunoDto.email() + " já se encontra cadastrado na base de dados!");
            }
        }
    }
}
