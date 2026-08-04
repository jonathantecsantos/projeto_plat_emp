package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.AnexoTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AnexoTemplateRepository extends JpaRepository<AnexoTemplate, Long> {
    List<AnexoTemplate> findByAnoLetivo(Integer anoLetivo);
}
