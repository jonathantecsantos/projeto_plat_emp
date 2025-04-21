package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Ods;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Professor;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.Ods.OdsRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.InscricaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AlunoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.EquipeRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.OdsRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.ProfessorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InscricaoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private EquipeRepository equipeRepository;

    @Autowired
    private OdsRepository odsRepository;

    @Autowired
    private AlunoService alunoService;

    @Autowired
    private ProfessorRepository professorRepository;

    @Transactional
    public void processarInscricao(InscricaoRecord inscricaoRecord) {
        Equipe equipe = equipeRepository.findByNome(inscricaoRecord.nomeTime().toUpperCase());
        if (equipe == null) {
            equipe = new Equipe();
            equipe.setNome(inscricaoRecord.nomeTime().toUpperCase());
            if (inscricaoRecord.listIdOds() != null) {
                for (OdsRecord ods : inscricaoRecord.listIdOds()) {
                    Optional<Ods> odsEncontrado = odsRepository.findById(ods.id());
                    if (odsEncontrado.isPresent()) {
                        Ods odsEncotrado = odsEncontrado.get();
                        equipe.getOdsList().add(odsEncotrado);
                    }
                }
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
}
