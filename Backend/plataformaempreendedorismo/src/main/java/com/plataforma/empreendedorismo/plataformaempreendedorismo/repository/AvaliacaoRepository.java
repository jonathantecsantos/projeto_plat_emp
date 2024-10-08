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

    @Query(value = "SELECT e.nome AS equipe, SUM(av.nota) AS totalNota " +
            "FROM avaliacao av " +
            "JOIN equipe e ON av.id_equipe = e.id " +
            "GROUP BY e.nome " +
            "ORDER BY totalNota DESC", nativeQuery = true)
    List<Object[]> findEquipeNotaOrderByTotalNotaDesc();

    @Query(value = "SELECT e.nome as equipe, fa.descricao, SUM(av.nota) AS totalNota " +
            "FROM avaliacao av " +
            "JOIN equipe e ON e.id = av.id_equipe " +
            "JOIN criterio_avaliacao ca ON ca.id = av.id_criterio_avaliacao " +
            "JOIN formato_avaliacao fa ON fa.id = ca.id_formato_avaliacao " +
            "WHERE fa.id = :idFormatoAvaliacao "  +
            "GROUP BY e.nome, fa.id, fa.descricao " +
            "ORDER BY totalNota DESC",
            nativeQuery = true)
    List<Object[]> findClassificacaoPorEquipeEFormato(
            @Param("idFormatoAvaliacao") Long idFormatoAvaliacao
    );

    @Query(value = "SELECT e.nome as equipe, fa.descricao as formato, ca.descricao as criterio, sa.descricao as subcriterio, sum(av.nota) as total_nota from avaliacao av " +
            "join equipe e on e.id = av.id_equipe " +
            "join criterio_avaliacao ca on ca.id = av.id_criterio_avaliacao " +
            "join subcriterio_avaliacao sa on sa.id = av.id_subcriterio_avaliacao " +
            "JOIN formato_avaliacao fa ON fa.id = ca.id_formato_avaliacao " +
            "WHERE e.id = :idEquipe " +
            "group by av.id_equipe, av.id_criterio_avaliacao, av.id_subcriterio_avaliacao " +
            "ORDER BY e.nome DESC",
            nativeQuery = true)
    List<Object[]> findNotasPorTime(@Param("idEquipe") Long idEquipe);

    @Query(value = "SELECT e.nome as equipe, fa.descricao as formato, ca.descricao as criterio, sa.descricao as subcriterio, sum(av.nota) as total_nota from avaliacao av " +
            "join equipe e on e.id = av.id_equipe " +
            "join criterio_avaliacao ca on ca.id = av.id_criterio_avaliacao " +
            "join subcriterio_avaliacao sa on sa.id = av.id_subcriterio_avaliacao " +
            "JOIN formato_avaliacao fa ON fa.id = ca.id_formato_avaliacao " +
            "group by av.id_equipe, av.id_criterio_avaliacao, av.id_subcriterio_avaliacao " +
            "ORDER BY e.nome DESC",
            nativeQuery = true)
    List<Object[]> getRelatorioClassificatorio();
}
