package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    Avaliacao findByIdEquipeAndIdCriterioAvaliacaoAndIdSubcriterioAvaliacaoAndIdAvaliador(Long idEquipe, Long criterioAvaliacaoId, Long subCriterioAvaliacaoId, Long avaliadorId);

    @Query(value = "SELECT av.* FROM avaliacao av " +
            "JOIN criterio_avaliacao ca ON av.id_criterio_avaliacao = ca.id " +
            "WHERE ca.id_formato_avaliacao = :idFormatoAvaliacao " +
            "AND av.id_avaliador = :idAvaliador " +
            "AND av.id_equipe = :idEquipe",
            nativeQuery = true)
    List<Avaliacao> findAvaliacoesByAvaliadorAndFormatoAndEquipe(
            @Param("idFormatoAvaliacao") Long idFormatoAvaliacao,
            @Param("idAvaliador") Long idAvaliador,
            @Param("idEquipe") Long idEquipe);


}
