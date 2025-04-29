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
import util.exceptions.CpfDuplicadoException;
import util.exceptions.EmailDuplicadoException;
import util.exceptions.LimiteProfessorEquipeException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public void processarInscricao(InscricaoRecord inscricaoRecord) throws CpfDuplicadoException, EmailDuplicadoException, LimiteProfessorEquipeException {

        for(AlunoCadastroRecord alunoDto : inscricaoRecord.alunos()){
            validaEmailDuiplicado(alunoDto);
        }

        professorService.validaLimiteDeProfessorEmEquipes(inscricaoRecord.idProfessor());

        Equipe equipe = equipeRepository.findByNome(inscricaoRecord.nomeTime().toUpperCase());
        if (equipe == null) {
            equipe = new Equipe();
            equipe.setNome(inscricaoRecord.nomeTime().toUpperCase());

            if (inscricaoRecord.listIdOds() != null && !inscricaoRecord.listIdOds().isEmpty()) {
                List<Ods> odsList = new ArrayList<>();
                for (OdsRecord ods : inscricaoRecord.listIdOds()) {
                    odsRepository.findById(ods.id()).ifPresent(odsList::add);
                }
                equipe.setOdsList(odsList);
            }

            if(inscricaoRecord.tipoAtividades() != null && !inscricaoRecord.tipoAtividades().isEmpty()){
                List<TipoAtividade> tipoAtividadeList = new ArrayList<>();
                for(TipoAtividadeRecord tipoAtividadeRecord : inscricaoRecord.tipoAtividades()){
                    tipoAtividadeRepository.findById(tipoAtividadeRecord.id())
                            .ifPresent(tipoAtividadeList::add);
                }
                equipe.setTipoAtividades(tipoAtividadeList);
            }

            if(inscricaoRecord.instituicaos() != null && !inscricaoRecord.instituicaos().isEmpty()){
                List<Instituicao> instituicaoList = new ArrayList<>();
                for(InstituicaoRecord instituicaoRecord : inscricaoRecord.instituicaos()){
                    instituicaoRepository.findById(instituicaoRecord.id())
                            .ifPresent(instituicaoList::add);
                }
                equipe.setInstituicoes(instituicaoList);
            }

            equipeRepository.saveAndFlush(equipe);

            Optional<Professor> professorRecuperado = professorRepository.findById(inscricaoRecord.idProfessor());
            if (professorRecuperado.isPresent()) {
                Professor professor = professorRecuperado.get();
                professor.getEquipes().add(equipe);
                professorRepository.save(professor);
            }
        }

        for (AlunoCadastroRecord alunoCadastroRecordRecord : inscricaoRecord.alunos()) {
            alunoService.persistirAlunoAndCriarAcesso(alunoCadastroRecordRecord, equipe);
        }
    }

    private void validaEmailDuiplicado(AlunoCadastroRecord alunoDto) throws CpfDuplicadoException, EmailDuplicadoException {
        alunoService.validarCpfDuplicado(alunoDto.cpf());
        Usuario usuario = usuarioService.buscarUsuarioPorLogin(alunoDto.email());
        if(usuario != null){
            throw new EmailDuplicadoException("Erro. E-mail " + alunoDto.email() + " já se encontra cadastrado na base de dados!");
        }
    }
}
