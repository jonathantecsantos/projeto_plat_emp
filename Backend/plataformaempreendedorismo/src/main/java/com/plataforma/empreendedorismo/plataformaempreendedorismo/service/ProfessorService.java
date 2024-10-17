package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Professor;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor.ProfessorEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor.ProfessorRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor.ProfessorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.EquipeRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.ProfessorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.enuns.TipoOperacaoEnum;
import util.exceptions.ValidarProfessorException;

import java.util.Optional;

@Service
public class ProfessorService {

    @Autowired
    private EquipeService equipeService;

    @Autowired
    private ProfessorRepository professorRepository;

    @Autowired
    private EquipeRepository equipeRepository;

    @Transactional
    public void criaProfessor(ProfessorCadastroRecord professorCadastroRecord) throws Exception {

        Equipe equipe = equipeService.buscarEquipePorId(professorCadastroRecord.idEquipe());
        //validaProfessor(TipoOperacaoEnum.CADASTRAR, null, professorCadastroRecord );
        professorRepository.save(new Professor(professorCadastroRecord,equipe));
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

        //validaProfessor(TipoOperacaoEnum.EDITAR,professorEditarRecord, null);
        atualizaProfessor(professor,professorEditarRecord);
    }

//    private void validaProfessor(TipoOperacaoEnum tipoOperacao, ProfessorEditarRecord professorEditarRecord,
//                                 ProfessorCadastroRecord professorCadastroRecord) throws ValidarProfessorException {
//        if(tipoOperacao.equals(TipoOperacaoEnum.CADASTRAR)){
//            validaProfessorCadastro(professorCadastroRecord);
//        }else{
//            validaProfessorEdicao(professorEditarRecord);
//        }
//    }

//    private void validaProfessorCadastro(ProfessorCadastroRecord professorCadastroRecord) throws ValidarProfessorException {
//        Professor professor = professorRepository.findByEquipeId(professorCadastroRecord.idEquipe());
////        if(professor != null){
////            throw new ValidarProfessorException("A equipe já possui um Professor");
////        }
//    }

//    private void validaProfessorEdicao(ProfessorEditarRecord professorEditarRecord) throws ValidarProfessorException {
//        Professor professor = professorRepository.findByEquipeId(professorEditarRecord.idEquipe());
//        if(professor != null && professor.getId() != professorEditarRecord.id()){
//            throw new ValidarProfessorException("A equipe já possui um Professor");
//        }
//    }

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
            Optional<Equipe> equipeOptional = equipeRepository.findById(professorEditarRecord.idEquipe());
            if (equipeOptional.isPresent()) {
                equipe = equipeOptional.get();
                professor.setEquipe(equipe);
            }
        }
    }
}
