package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.EnumRole;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Professor;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor.ProfessorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor.ProfessorEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor.ProfessorRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.UsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.EquipeRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.ProfessorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.exceptions.CpfUtilizadoException;
import util.exceptions.EmailUtilizadoException;
import util.exceptions.LimiteProfessorEquipeException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProfessorService {

    @Autowired
    private EquipeService equipeService;
    @Autowired
    private ProfessorRepository professorRepository;
    @Autowired
    private EquipeRepository equipeRepository;
    @Autowired
    private UsuarioService usuarioService;

    @Transactional
    public void criaProfessor(ProfessorCadastroRecord professorCadastroRecord) throws Exception {

        validarCpfCadastrado(professorCadastroRecord);
        validaEmailCadastrado(professorCadastroRecord);
        validaQuantidadeDeEquipes(professorCadastroRecord);

        List<Equipe> equipeList = new ArrayList<>();

        for(Long idEquipe : professorCadastroRecord.idEquipe()){
            Equipe equipe = equipeService.buscarEquipePorId(idEquipe);
            equipeList.add(equipe);
        }

        professorRepository.save(new Professor(professorCadastroRecord,equipeList));
    }

    private void validaQuantidadeDeEquipes(ProfessorCadastroRecord professorCadastroRecord) {
        if (professorCadastroRecord.idEquipe().size() > 3) {
            throw new LimiteProfessorEquipeException("O limite de Equipes por Professor é três!");
        }
    }

    private void validaEmailCadastrado(ProfessorCadastroRecord professorCadastroRecord) throws EmailUtilizadoException {
        usuarioService.validarUsuarioCadastrado(professorCadastroRecord.email());
    }

    private void validarCpfCadastrado(ProfessorCadastroRecord professorCadastroRecord) throws CpfUtilizadoException {
        if (validarCpfDuplicado(professorCadastroRecord.cpf())) {
            throw new CpfUtilizadoException("Erro. O CPF: " + professorCadastroRecord.cpf() + " já se encontra cadastrado na base de dados!");
        }
    }

    private boolean validarCpfDuplicado(String cpf) {
        Professor professor = professorRepository.findByCpf(cpf);
        return professor != null;
    }

    public ProfessorRecord buscaProfessorPorId(Long id) {
        Optional<Professor> professorOptional = professorRepository.findById(id);

        if(professorOptional.isPresent()){
            Professor professor = professorOptional.get();
            return new ProfessorRecord(professor);
        }
        return null;
    }

    @Transactional
    public void editaProfessor(ProfessorEditarRecord professorEditarRecord){
        Professor professor = professorRepository.getReferenceById(professorEditarRecord.id());
        atualizaProfessor(professor,professorEditarRecord);
    }

    private void atualizaProfessor(Professor professor, ProfessorEditarRecord professorEditarRecord) {
        if(professorEditarRecord.cpf() != null){
            professor.setCpf(professorEditarRecord.cpf());
        }
        if(professorEditarRecord.nome() != null){
            professor.setNome(professorEditarRecord.nome());
        }
        if(professorEditarRecord.email() != null){
            professor.setEmail(professorEditarRecord.email());
        }
        if(professorEditarRecord.dataNascimento() != null){
            professor.setDataNascimento(professorEditarRecord.dataNascimento());
        }

        if(professorEditarRecord.tamanhoCamisa() != null){
            professor.setTamanhoCamisa(professorEditarRecord.tamanhoCamisa());
        }
        if(professorEditarRecord.idEquipe() != null){
            professor.getEquipes().clear();
            for(Long id : professorEditarRecord.idEquipe()){
                equipeRepository.findById(id).ifPresent(professor.getEquipes()::add);
            }
        }
    }

    public UsuarioRecord persistirProfessorAndCriarAcesso(ProfessorCadastroRecord professorCadastroRecord) throws Exception {
        List<Equipe> equipeList = new ArrayList<>();

        for(Long id : professorCadastroRecord.idEquipe()){
            Equipe equipe = equipeService.buscarEquipePorId(id);
            equipeList.add(equipe);
        }
        Professor professor = professorRepository.save(new Professor(professorCadastroRecord,equipeList));
        return usuarioService.criarUsuario(professor, professor.getEmail(), EnumRole.ROLE_PROFESSOR);
    }

    public void validaLimiteDeProfessorEmEquipes(Long idProfessor){
        professorRepository.findById(idProfessor).ifPresent(professor -> {
            if (professor.getEquipes().size() >= 3) {
                throw new LimiteProfessorEquipeException("O professor já está associado a 3 ou mais equipes. Selecione outro Professor!");
            }
        });
    }
}
