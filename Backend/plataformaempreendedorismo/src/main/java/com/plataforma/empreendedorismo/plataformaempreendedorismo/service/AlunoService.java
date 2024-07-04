package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Aluno;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Ods;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AlunoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;
    @Autowired
    private OdsService odsService;
    @Autowired
    private EquipeService equipeService;

    @Transactional
    public void criarAluno(AlunoCadastroRecord alunoCadastroRecord) throws Exception {

        Ods ods = odsService.buscarOdsPorId(alunoCadastroRecord.idOds());
        Equipe equipe = equipeService.buscarEquipePorId(alunoCadastroRecord.idEquipe());

        alunoRepository.save(new Aluno(alunoCadastroRecord,ods,equipe));

    }


}
