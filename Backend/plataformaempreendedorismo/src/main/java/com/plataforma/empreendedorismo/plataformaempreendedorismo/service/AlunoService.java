package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Aluno;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AlunoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.EquipeRepository;
import jakarta.transaction.Transactional;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.enuns.TipoOperacaoEnum;
import util.exceptions.ValidaAlunoException;

import java.util.Optional;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private EquipeRepository equipeRepository;

    @Autowired
    private EquipeService equipeService;

    @Transactional
    public void criarAluno(AlunoCadastroRecord alunoCadastroRecord) throws Exception {
        Equipe equipe = equipeService.buscarEquipePorId(alunoCadastroRecord.idEquipe());
        validaLiderAndViceLider(TipoOperacaoEnum.CADASTRAR ,null , alunoCadastroRecord, null,equipe);
        alunoRepository.save(new Aluno(alunoCadastroRecord,equipe));
    }

    @Transactional
    public void editarAluno(AlunoEditarRecord alunoEditarRecord) throws ValidaAlunoException {
        Aluno aluno = alunoRepository.getReferenceById(alunoEditarRecord.id());
        Equipe equipe = equipeRepository.getReferenceById(alunoEditarRecord.idEquipe());

        validaLiderAndViceLider(TipoOperacaoEnum.EDITAR ,aluno , null, alunoEditarRecord,equipe);
        atualizarAluno(aluno, alunoEditarRecord);

    }

    private void validaLiderAndViceLider(TipoOperacaoEnum tipo,
                                         Aluno aluno,
                                         AlunoCadastroRecord alunoCadastroRecord,
                                         AlunoEditarRecord alunoEditarRecord,
                                         Equipe equipe) throws ValidaAlunoException {
        if (tipo.equals(TipoOperacaoEnum.CADASTRAR)){
            validarLiderAndViceLiderCadastro(equipe, alunoCadastroRecord);
        } else{
            validaLiderAndViceLiderEdicao(aluno, alunoEditarRecord, equipe);
        }
    }

    private void validarLiderAndViceLiderCadastro(Equipe equipe, AlunoCadastroRecord alunoCadastroRecord) throws ValidaAlunoException {
        if(Boolean.TRUE.equals(alunoCadastroRecord.isLider()) || Boolean.TRUE.equals(alunoCadastroRecord.isViceLider())){
            for(Aluno alunoList : equipe.getAlunos()){
                if(alunoCadastroRecord.isLider() && alunoList.getIsLider()){
                    throw new ValidaAlunoException("Já existe um Líder no time!");
                }
                if(alunoCadastroRecord.isViceLider() && alunoList.getIsViceLider()){
                    throw new ValidaAlunoException("Já existe um Vice-líder no time!");
                }
            }
        }
    }

    private void validaLiderAndViceLiderEdicao(Aluno aluno, AlunoEditarRecord alunoEditarRecord, Equipe equipe) throws ValidaAlunoException {
        if(!Objects.equals(aluno.getIsLider(), alunoEditarRecord.isLider())
                || !Objects.equals(aluno.getIsViceLider(), alunoEditarRecord.isViceLider())){
                    for(Aluno alunoList : equipe.getAlunos()){
                        if(aluno != alunoList && ((Objects.equals(alunoList.getIsLider(), alunoEditarRecord.isLider())) || (Objects.equals(alunoList.getIsViceLider(), alunoEditarRecord.isViceLider())))){
                            throw new ValidaAlunoException("Já existe um Líder/Vice-líder no time!");
                        }
                    }
        }
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
            return new AlunoRecord(aluno);
        }

        return null;
    }
}
