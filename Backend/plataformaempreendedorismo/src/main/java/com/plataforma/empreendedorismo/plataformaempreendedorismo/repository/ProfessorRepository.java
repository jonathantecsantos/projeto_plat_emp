package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Professor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProfessorRepository extends JpaRepository<Professor, Long> {

    @Query(value = "SELECT * FROM professor p " +
            "JOIN professor_equipe ep ON ep.id_professor = p.id " +
            "WHERE ep.id_equipe = :equipeId", nativeQuery = true)
    List<Professor> findProfessoresByEquipeId(@Param("equipeId") Long equipeId);

    Professor findByCpf(String cpf);

    List<Professor> findByHabilitadoTrue();
}
