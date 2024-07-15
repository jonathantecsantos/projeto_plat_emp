package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Aluno;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Ods;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.AlunoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.Ods.OdsRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.EquipeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AlunoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.EquipeRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.OdsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;
    @Autowired
    private OdsService odsService;

    @Autowired
    private OdsRepository odsRepository;

    @Autowired
    private EquipeRepository equipeRepository;

    @Autowired
    private EquipeService equipeService;

    @Transactional
    public void criarAluno(AlunoCadastroRecord alunoCadastroRecord) throws Exception {

        Ods ods = odsService.buscarOdsPorId(alunoCadastroRecord.idOds());
        Equipe equipe = equipeService.buscarEquipePorId(alunoCadastroRecord.idEquipe());

        alunoRepository.save(new Aluno(alunoCadastroRecord,ods,equipe));

    }

    @Transactional
    public void editarAluno(AlunoEditarRecord alunoEditarRecord) {
        Aluno aluno = alunoRepository.getReferenceById(alunoEditarRecord.id());
        atualizarAluno(aluno, alunoEditarRecord);
    }

    public void atualizarAluno(Aluno aluno, AlunoEditarRecord alunoEditarRecord) {
        if(alunoEditarRecord.cpf() != null){
            aluno.setCpf(alunoEditarRecord.cpf());
        }
        if(alunoEditarRecord.nome() != null){
            aluno.setNome(alunoEditarRecord.nome());
        }
        if(alunoEditarRecord.email() != null){
            aluno.setEmail(alunoEditarRecord.email());
        }
        if(alunoEditarRecord.turma() != null){
            aluno.setTurma(alunoEditarRecord.turma());
        }
        if(alunoEditarRecord.isLider() != null){
            aluno.setIsLider(alunoEditarRecord.isLider());
        }
        if(alunoEditarRecord.isViceLider() != null){
            aluno.setIsViceLider(alunoEditarRecord.isViceLider());
        }
        if(alunoEditarRecord.idOds() != null){
            Ods ods;
            Optional<Ods> odsOptional = odsRepository.findById(alunoEditarRecord.idOds());
            if (odsOptional.isPresent()) {
                ods = odsOptional.get();
                aluno.setOds(ods);
            }
        }
        if(alunoEditarRecord.idEquipe() != null){
            Equipe equipe;
            Optional<Equipe> equipeOptional = equipeRepository.findById(alunoEditarRecord.idEquipe());
            if (equipeOptional.isPresent()) {
                equipe = equipeOptional.get();
                aluno.setEquipe(equipe);
            }
        }
    }

    public AlunoRecord buscarAlunoPorId(Long id) {

        Optional<Aluno> alunoOptional = alunoRepository.findById(id);

        if(alunoOptional.isPresent()){
            Aluno aluno = alunoOptional.get();
            return new AlunoRecord(aluno.getId(), aluno.getCpf(), aluno.getNome(), aluno.getEmail(), aluno.getTurma(),
                    aluno.getIsLider(), aluno.getIsViceLider(),
                    aluno.getOds(), aluno.getEquipe());
        }

        return null;
    }
}
