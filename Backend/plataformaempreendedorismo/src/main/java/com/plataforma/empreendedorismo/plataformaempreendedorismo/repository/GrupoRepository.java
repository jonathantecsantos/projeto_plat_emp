package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Grupo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrupoRepository extends JpaRepository<Grupo, Long> {

    Grupo findByNome (String nome);
}
