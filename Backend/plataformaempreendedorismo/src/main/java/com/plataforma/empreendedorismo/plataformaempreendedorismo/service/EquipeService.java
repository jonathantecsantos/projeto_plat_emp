package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Aluno;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Professor;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.EquipeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaDadosEquipeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaEquipesAvaliadasRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaEquipesRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AlunoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.EquipeRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.ProfessorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.exceptions.ValidaAlunoException;

import java.util.List;
import java.util.Optional;

@Service
public class EquipeService {

    @Autowired
    private EquipeRepository equipeRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    public ListaDadosEquipeRecord getEquipeDTO(Long equipeId) {
        Equipe equipe = equipeRepository.findById(equipeId).orElseThrow(() -> new RuntimeException("Equipe não encontrada"));
        List<Aluno> alunos = alunoRepository.findByEquipeId(equipeId);
        Professor professor = professorRepository.findByEquipeId(equipeId);

        return new ListaDadosEquipeRecord(equipe.getNome(), alunos, professor, equipe.getOdsList());
    }

    public Equipe buscarEquipePorId(Long id) throws Exception {

        Equipe equipe;
        try {
            Optional<Equipe> optionalEquipeequipe = equipeRepository.findById(id);
            if (optionalEquipeequipe.isPresent()) {
                equipe = optionalEquipeequipe.get();

            } else {
                throw new Exception("Equipe não encontrada com o ID: " + id);
            }
        } catch (Exception e) {
            throw new Exception("Erro ao buscar Equipe: " + e.getMessage(), e);
        }
        return equipe;
    }

    public List<ListaEquipesRecord> buscarEquipes() {
        return equipeRepository.findAll().stream().map(ListaEquipesRecord::new).toList();
    }

    @Transactional
    public void editarEquipe(EquipeRecord equipeRecord) {
        Equipe equipe = equipeRepository.getReferenceById(equipeRecord.id());
        atualizarEquipe(equipe, equipeRecord);
    }

    private void atualizarEquipe(Equipe equipe, EquipeRecord equipeRecord) {
        if(equipeRecord.nome() != null){
            equipe.setNome(equipeRecord.nome());
        }
        if(equipeRecord.linkPitch() != null){
            equipe.setLinkPitch(equipeRecord.linkPitch());
        }
    }

    public List<ListaEquipesAvaliadasRecord> buscarEquipesTipoAvaliacao() {

        return equipeRepository.findAll().stream().map(ListaEquipesAvaliadasRecord::new).toList();
    }
}
