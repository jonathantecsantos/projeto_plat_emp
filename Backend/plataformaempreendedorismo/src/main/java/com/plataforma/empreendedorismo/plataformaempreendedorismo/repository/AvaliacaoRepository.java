package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    Avaliacao findByIdEquipeAndIdCriterioAvaliacaoAndIdSubcriterioAvaliacaoAndIdAvaliador(Long idEquipe, Long criterioAvaliacaoId, Long subCriterioAvaliacaoId, Long avaliadorId);
}
