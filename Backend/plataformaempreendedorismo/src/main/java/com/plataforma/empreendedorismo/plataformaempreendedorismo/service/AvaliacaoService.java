package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.controller.ItensRelatorioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.*;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliacao.AvaliacaoEquipeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliacao.AvaliacaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliacao.FormatoAvaliacaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.equipe.ListaEquipesAvaliadasRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.relatorio.ClassificacaoGeralTimesRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.relatorio.DatalhamentoClassificacaoFormatoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.relatorio.DetalhamentoNotasTimeRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AvaliacaoService {

    @Autowired
    private CriterioAvaliacaoRepository criterioAvaliacaoRepository;

    @Autowired
    private SubcriterioAvaliacaoRepository subcriterioAvaliacaoRepository;

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

//        for (AvaliacaoEquipeRecord record : avaliacaoEquipeRecord) {
//            Avaliacao avaliacaoExistente = getAvaliacaoByIdEquipeAndIdCriterioAvaliacaoAndIdSubcriterioAvaliacao(record);
//
//            if (avaliacaoExistente != null) {
//                throw new Exception("Avaliação já realizada para o time " + record.idEquipe()
//                        + " com o critério " + record.idCriterioAvaliacao()
//                        + " e subcritério " + record.idSubcriterioAvaliacao());
//            }
//        }

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
            if (avaliacao != null) {
                avaliacao.setNota(avaliacaoRecord.nota());
                avaliacaoRepository.save(avaliacao);
            }else {
                throw new Exception("Avaliação não encontrada para os parâmetros fornecidos.");
            }

        }
        persistirRegistroAvaliacao(avaliacaoEquipeRecord);
    }

    private Avaliacao getAvaliacaoByIdEquipeAndIdCriterioAvaliacaoAndIdSubcriterioAvaliacao(AvaliacaoEquipeRecord avaliacaoRecord) {
        return avaliacaoRepository.findByIdEquipeAndIdCriterioAvaliacaoAndIdSubcriterioAvaliacaoAndIdAvaliador(avaliacaoRecord.idEquipe(),
                avaliacaoRecord.idCriterioAvaliacao(), avaliacaoRecord.idSubcriterioAvaliacao(), avaliacaoRecord.idAvaliador());
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

    public List<AvaliacaoRecord> getAvaliacoesPorTipoProfessor(Long idFormatoAvaliacao, Long idAvaliador, Long idEquipe) {

        List<Avaliacao> avaliacaos = avaliacaoRepository.findAvaliacoesByAvaliadorAndFormatoAndEquipe(idFormatoAvaliacao, idAvaliador, idEquipe);

        return avaliacaos.stream()
                .map(avaliacao -> new AvaliacaoRecord(
                        avaliacao.getIdCriterioAvaliacao(),
                        avaliacao.getIdSubcriterioAvaliacao(),
                        avaliacao.getNota())
                ).collect(Collectors.toList());

    }

    public List<ClassificacaoGeralTimesRecord> buscarClassificacao() {
        List<Object[]> results = avaliacaoRepository.findEquipeNotaOrderByTotalNotaDesc();

        return results.stream()
                .map(result -> new ClassificacaoGeralTimesRecord(
                        (String) result[0],
                        (Double) result[1]
                ))
                .collect(Collectors.toList());
    }

    public List<DatalhamentoClassificacaoFormatoRecord> buscarClassificacaoPorFormato(Long idFormatoAvaliacao) {
        List<Object[]> results = avaliacaoRepository.findClassificacaoPorEquipeEFormato(idFormatoAvaliacao);

        return results.stream()
                .map(result -> new DatalhamentoClassificacaoFormatoRecord(
                        (String) result[0],
                        (String) result[1],
                        (Double) result[2]
                ))
                .collect(Collectors.toList());
    }

    public List<DetalhamentoNotasTimeRecord> buscarNotasPorTime(Long idEquipe) {
        List<Object[]> results = avaliacaoRepository.findNotasPorTime(idEquipe);

        return results.stream()
                .map(result -> new DetalhamentoNotasTimeRecord(
                        (String) result[0],
                        (String) result[1],
                        (String) result[2],
                        (String) result[3],
                        (Double) result[4]
                ))
                .collect(Collectors.toList());

    }

    public List<DetalhamentoNotasTimeRecord> buscarRelatorioGeral() {
        List<Object[]> results = avaliacaoRepository.getRelatorioClassificatorio();

        return results.stream()
                .map(result -> new DetalhamentoNotasTimeRecord(
                        (String) result[0],
                        (String) result[1],
                        (String) result[2],
                        (String) result[3],
                        (Double) result[4]
                ))
                .collect(Collectors.toList());

    }

    public List<ItensRelatorioRecord> buscarItensDoRelatorio() {
        return subcriterioAvaliacaoRepository.findAll(Sort.by("ordemRelatorio")).stream()
                .map(subcriterioAvaliacao -> new ItensRelatorioRecord(subcriterioAvaliacao.getDescricao(),subcriterioAvaliacao.getOrdemRelatorio()))
                .collect(Collectors.toList());
    }
}
