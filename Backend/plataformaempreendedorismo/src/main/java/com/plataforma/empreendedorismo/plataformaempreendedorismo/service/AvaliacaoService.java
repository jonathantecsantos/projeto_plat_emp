package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.*;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliacao.AvaliacaoEquipeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliacao.FormatoAvaliacaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaEquipesAvaliadasRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaEquipesRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AvaliacaoService {

    @Autowired
    private CriterioAvaliacaoRepository criterioAvaliacaoRepository;

    @Autowired
    private FormatoAvaliacaoRepository formatoAvaliacaoRepository;

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private AvaliadorRepository avaliadorRepository;

    @Autowired
    private RegistroAvaliacaoRepository registroAvaliacaoRepository;

    @Autowired
    private EquipeService equipeService;

    public List<CriterioAvaliacao> buscarAvaliacao(Long idFormato) {
        return criterioAvaliacaoRepository.findByFormatoAvaliacaoId(idFormato);
    }

    public List<FormatoAvaliacaoRecord> buscarFormatosAvaliacao() {

        return formatoAvaliacaoRepository.findAll().stream()
                .map(formatoAvaliacao -> new FormatoAvaliacaoRecord(formatoAvaliacao.getId(), formatoAvaliacao.getDescricao()))
                .collect(Collectors.toList());
    }

    @Transactional
    public void avaliarEquipe(List<AvaliacaoEquipeRecord> avaliacaoEquipeRecord) throws Exception {

        for (AvaliacaoEquipeRecord record : avaliacaoEquipeRecord) {
            Avaliacao avaliacaoExistente = getAvaliacaoByIdEquipeAndIdCriterioAvaliacaoAndIdSubcriterioAvaliacao(record);

            if (avaliacaoExistente != null) {
                throw new Exception("Avaliação já realizada para o time " + record.idEquipe()
                        + " com o critério " + record.idCriterioAvaliacao()
                        + " e subcritério " + record.idSubcriterioAvaliacao());
            }
        }

        List<Avaliacao> avaliacaos = avaliacaoEquipeRecord.stream()
                .map(Avaliacao::new)
                .collect(Collectors.toList());
        avaliacaoRepository.saveAll(avaliacaos);
        persistirRegistroAvaliacao(avaliacaoEquipeRecord);
    }

    @Transactional
    public void editarAvaliacaoEquipe(List<AvaliacaoEquipeRecord> avaliacaoEquipeRecord) throws Exception {
        for(AvaliacaoEquipeRecord avaliacaoRecord : avaliacaoEquipeRecord){
            Avaliacao avaliacao = getAvaliacaoByIdEquipeAndIdCriterioAvaliacaoAndIdSubcriterioAvaliacao(avaliacaoRecord);
            avaliacao.setNota(avaliacaoRecord.nota());
        }
        persistirRegistroAvaliacao(avaliacaoEquipeRecord);
    }

    private Avaliacao getAvaliacaoByIdEquipeAndIdCriterioAvaliacaoAndIdSubcriterioAvaliacao(AvaliacaoEquipeRecord avaliacaoRecord) {
        return avaliacaoRepository.findByIdEquipeAndIdCriterioAvaliacaoAndIdSubcriterioAvaliacao(avaliacaoRecord.idEquipe(),
                avaliacaoRecord.idCriterioAvaliacao(), avaliacaoRecord.idSubcriterioAvaliacao());
    }

    private void persistirRegistroAvaliacao(List<AvaliacaoEquipeRecord> listAvaliacao) throws Exception {
        Long idAvaliador = listAvaliacao.get(0).idAvaliador();
        Avaliador avaliador = avaliadorRepository.findById(idAvaliador)
                .orElseThrow(() -> new EntityNotFoundException("Avaliador não encontrado com o ID: " + idAvaliador));

        Long idTipoAvaliacao = listAvaliacao.get(0).idTipoAvaliacao();
        FormatoAvaliacao formatoAvaliacao = getFormatoAvaliacao(idTipoAvaliacao);

        Long idEquipe = listAvaliacao.get(0).idEquipe();
        Equipe equipe = equipeService.buscarEquipePorId(idEquipe);

        if(avaliador != null){
            RegistroAvaliacao registroAvaliacao = new RegistroAvaliacao();
            registroAvaliacao.setAvaliador(avaliador);
            registroAvaliacao.setFormatoAvaliacao(formatoAvaliacao);

            LocalDateTime dataHoraAtual = LocalDateTime.now();
            Date date = Timestamp.valueOf(dataHoraAtual);
            registroAvaliacao.setDataAvaliacao(date);
            registroAvaliacao.setEquipe(equipe);

            registroAvaliacaoRepository.save(registroAvaliacao);
        }
    }

    private FormatoAvaliacao getFormatoAvaliacao(Long idTipoAvaliacao) {
        return formatoAvaliacaoRepository.findById(idTipoAvaliacao)
                .orElseThrow(() -> new EntityNotFoundException("Formato Avaliador não encontrado " + idTipoAvaliacao));
    }

    public List<ListaEquipesAvaliadasRecord> buscarEquipes(Long idTipoAvaliacao, Long idAvaliador) {

        List<ListaEquipesAvaliadasRecord> listEquipesBanco = equipeService.buscarEquipesTipoAvaliacao();

        List<RegistroAvaliacao> registroAvaliacaoList = registroAvaliacaoRepository
                .findByFormatoAvaliacaoIdAndAvaliadorId(idTipoAvaliacao, idAvaliador);

        Set<Long> equipesAvaliadasIds = registroAvaliacaoList.stream()
                .map(registro -> registro.getEquipe().getId())
                .collect(Collectors.toSet());

        return listEquipesBanco.stream()
                .map(equipe -> new ListaEquipesAvaliadasRecord(
                        equipe.id(),
                        equipe.nome(),
                        equipesAvaliadasIds.contains(equipe.id())
                ))
                .collect(Collectors.toList());
    }

}
