package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.RegistroAvaliacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegistroAvaliacaoRepository extends JpaRepository<RegistroAvaliacao, Long> {
    List<RegistroAvaliacao> findByFormatoAvaliacaoIdAndAvaliadorId(Long idTipoAvaliacao, Long idAvaliador);
}
