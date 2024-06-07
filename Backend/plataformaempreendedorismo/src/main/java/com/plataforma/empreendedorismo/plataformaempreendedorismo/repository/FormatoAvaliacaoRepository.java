package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.FormatoAvaliacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FormatoAvaliacaoRepository extends JpaRepository<FormatoAvaliacao, Long> {

    FormatoAvaliacao findByDescricao(String descricao);
}
