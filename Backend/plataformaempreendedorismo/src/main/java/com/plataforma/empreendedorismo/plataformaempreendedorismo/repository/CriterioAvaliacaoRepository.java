package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.CriterioAvaliacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CriterioAvaliacaoRepository extends JpaRepository<CriterioAvaliacao, Long> {
    List<CriterioAvaliacao> findByFormatoAvaliacaoId(Long id);
}
