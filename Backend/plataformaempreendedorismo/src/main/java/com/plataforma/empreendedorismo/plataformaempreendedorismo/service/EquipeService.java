package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.*;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.Ods.OdsRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.EquipeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaDadosEquipeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaEquipesAvaliadasRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaEquipesRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.instituicao.InstituicaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.tipoAtividade.TipoAtividadeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    @Autowired
    private OdsRepository odsRepository;

    @Autowired
    private InstituicaoRepository instituicaoRepository;

    @Autowired
    private TipoAtividadeRepository tipoAtividadeRepository;

    public ListaDadosEquipeRecord getEquipeDTO(Long equipeId) {
        Equipe equipe = equipeRepository.findById(equipeId).orElseThrow(() -> new RuntimeException("Equipe não encontrada"));
        List<Aluno> alunos = alunoRepository.findByEquipeId(equipeId);
        List<Professor> professores = professorRepository.findProfessoresByEquipeId(equipeId);

        return new ListaDadosEquipeRecord(equipe.getNome(), alunos, professores, equipe.getOdsList(), equipe.getLinkPitch(), equipe.getInstituicoes());
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
        if (equipeRecord.nome() != null) {
            equipe.setNome(equipeRecord.nome());
        }
        if (equipeRecord.linkPitch() != null) {
            equipe.setLinkPitch(equipeRecord.linkPitch());
        }

        if (equipeRecord.listIdOds() != null && !equipeRecord.listIdOds().isEmpty()) {
            List<Ods> odsList = new ArrayList<>();
            for (OdsRecord odsRecord : equipeRecord.listIdOds()) {
                odsRepository.findById(odsRecord.id())
                        .ifPresent(odsList::add);
            }
            equipe.setOdsList(odsList);
        }

        if(equipeRecord.tipoAtividadeList() != null && !equipeRecord.tipoAtividadeList().isEmpty()){
            List<TipoAtividade> tipoAtividadeList = new ArrayList<>();
            for(TipoAtividadeRecord tipoAtividadeRecord : equipeRecord.tipoAtividadeList()){
                tipoAtividadeRepository.findById(tipoAtividadeRecord.id())
                        .ifPresent(tipoAtividadeList::add);
            }
            equipe.setTipoAtividades(tipoAtividadeList);
        }

        if (equipeRecord.instituicoes() != null && !equipeRecord.instituicoes().isEmpty()) {
            List<Instituicao> instituicoes = new ArrayList<>();
            for (InstituicaoRecord instituicaoRecord : equipeRecord.instituicoes()) {
                instituicaoRepository.findById(instituicaoRecord.id())
                        .ifPresent(instituicoes::add);
            }
            equipe.setInstituicoes(instituicoes);
        }

        equipeRepository.save(equipe);
    }

    public List<ListaEquipesAvaliadasRecord> buscarEquipesTipoAvaliacao() {
        return equipeRepository.findAll().stream().map(ListaEquipesAvaliadasRecord::new).toList();
    }
}
