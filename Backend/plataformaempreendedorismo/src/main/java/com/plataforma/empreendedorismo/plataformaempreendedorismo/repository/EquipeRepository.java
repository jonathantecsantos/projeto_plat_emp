package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Equipe;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Propagation;

public interface EquipeRepository extends JpaRepository<Equipe, Long> {
    Equipe findByNome(String nome);

}
