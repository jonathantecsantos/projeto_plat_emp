package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.CriterioAvaliacao;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliacao.FormatoAvaliacaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.CriterioAvaliacaoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.FormatoAvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AvaliacaoService {

    @Autowired
    private CriterioAvaliacaoRepository criterioAvaliacaoRepository;

    @Autowired
    private FormatoAvaliacaoRepository formatoAvaliacaoRepository;

    public List<CriterioAvaliacao> buscarAvaliacao(Long idFormato) {
        return criterioAvaliacaoRepository.findByFormatoAvaliacaoId(idFormato);
    }

    public List<FormatoAvaliacaoRecord> buscarFormatosAvaliacao() {

        return formatoAvaliacaoRepository.findAll().stream()
                .map(formatoAvaliacao -> new FormatoAvaliacaoRecord(formatoAvaliacao.getId(), formatoAvaliacao.getDescricao()))
                .collect(Collectors.toList());
    }
}
