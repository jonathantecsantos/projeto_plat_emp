package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Aluno;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.EnumRole;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.UsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AlunoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.EquipeRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import util.enuns.TipoOperacaoEnum;
import util.exceptions.ValidaAlunoException;

import java.util.Objects;
import java.util.Optional;

@Service
public class AlunoService {
    private final AlunoRepository alunoRepository;
    private final EquipeRepository equipeRepository;
    private final EquipeService equipeService;

    AlunoService(AlunoRepository alunoRepository,EquipeRepository equipeRepository, EquipeService equipeService){
        this.alunoRepository = alunoRepository;
        this.equipeRepository = equipeRepository;
        this.equipeService = equipeService;
    }

    @Autowired
    private UsuarioService usuarioService;

    @Transactional
    public UsuarioRecord criarAluno(AlunoCadastroRecord alunoCadastroRecord) throws Exception {
        Equipe equipe = equipeService.buscarEquipePorId(alunoCadastroRecord.idEquipe());
        validaLiderAndViceLider(TipoOperacaoEnum.CADASTRAR ,alunoCadastroRecord , null,equipe);
        alunoRepository.save(new Aluno(alunoCadastroRecord,equipe));
    }

    @Transactional
    public void editarAluno(AlunoEditarRecord alunoEditarRecord) throws ValidaAlunoException {
        Aluno aluno = alunoRepository.getReferenceById(alunoEditarRecord.id());
        Equipe equipe = equipeRepository.getReferenceById(alunoEditarRecord.idEquipe());

        validaLiderAndViceLider(TipoOperacaoEnum.EDITAR , null, alunoEditarRecord,equipe);
        atualizarAluno(aluno, alunoEditarRecord);

    }

    private void validaLiderAndViceLider(TipoOperacaoEnum tipo,
                                         AlunoCadastroRecord alunoCadastroRecord,
                                         AlunoEditarRecord alunoEditarRecord,
                                         Equipe equipe) throws ValidaAlunoException {
        if (tipo.equals(TipoOperacaoEnum.CADASTRAR)){
            validarLiderAndViceLiderCadastro(equipe, alunoCadastroRecord);
        } else{
            validaLiderAndViceLiderEdicao(alunoEditarRecord, equipe);
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

    private void validaLiderAndViceLiderEdicao(AlunoEditarRecord alunoEditarRecord, Equipe equipe) throws ValidaAlunoException {
        validarLiderancaDupla(alunoEditarRecord);
        validarSeExisteLider(alunoEditarRecord, equipe);
        validarSeExisteViceLider(alunoEditarRecord, equipe);

    }

    private void validarLiderancaDupla(AlunoEditarRecord alunoEditarRecord) throws ValidaAlunoException {
        if(alunoEditarRecord.isLider() && alunoEditarRecord.isViceLider()){
            throw new ValidaAlunoException("O aluno não pode ser Lider e Vice-lider");
        }
    }

    private void validarSeExisteViceLider(AlunoEditarRecord aluno, Equipe equipe) throws ValidaAlunoException {
        for(Aluno alunoList : equipe.getAlunos()) {
            if(Boolean.TRUE.equals(alunoList.getIsViceLider() && !Objects.equals(alunoList.getId(),aluno.id())) && Boolean.TRUE.equals(aluno.isViceLider())){
                throw new ValidaAlunoException("Já existe um Vice-Líder no time!");
            }
        }
    }

    private void validarSeExisteLider(AlunoEditarRecord aluno, Equipe equipe) throws ValidaAlunoException {
        for(Aluno alunoList : equipe.getAlunos()) {
            if(Boolean.TRUE.equals(alunoList.getIsLider() && !Objects.equals(alunoList.getId(), aluno.id())) && Boolean.TRUE.equals(aluno.isLider())){
                throw new ValidaAlunoException("Já existe um Líder no time!");
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
