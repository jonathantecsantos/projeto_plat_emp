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
import util.exceptions.ValidarProfessorException;

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

        List<Equipe> equipeList = new ArrayList<>();

        for(Long idEquipe : professorCadastroRecord.idEquipe()){
            Equipe equipe = equipeService.buscarEquipePorId(idEquipe);
            equipeList.add(equipe);
        }
        professorRepository.save(new Professor(professorCadastroRecord,equipeList));
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
    public void editaProfessor(ProfessorEditarRecord professorEditarRecord) throws ValidarProfessorException {
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
        if(professorEditarRecord.idEquipe() != null){
            Equipe equipe;
            for(Long id : professorEditarRecord.idEquipe()){
                Optional<Equipe> equipeOptional = equipeRepository.findById(id);
                if (equipeOptional.isPresent()) {
                    equipe = equipeOptional.get();
                    professor.getEquipes().add(equipe);
                }
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
}
