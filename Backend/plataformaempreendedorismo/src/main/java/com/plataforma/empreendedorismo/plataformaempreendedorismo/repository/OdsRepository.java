package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Ods;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OdsRepository extends JpaRepository<Ods,Long> {

    Ods findByCodigo (String codigo);

}
