package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.TipoAtividade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TipoAtividadeRepository extends JpaRepository<TipoAtividade, Long> {
    List<TipoAtividade> findByAtivoTrue();

}
