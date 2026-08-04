package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface EquipeRepository extends JpaRepository<Equipe, Long> {
    Equipe findByNome(String nome);

    List<Equipe> findByAno(Integer ano);

    @Query("SELECT DISTINCT e.ano FROM equipe e WHERE e.ano IS NOT NULL ORDER BY e.ano DESC")
    List<Integer> findDistinctAnos();
}
