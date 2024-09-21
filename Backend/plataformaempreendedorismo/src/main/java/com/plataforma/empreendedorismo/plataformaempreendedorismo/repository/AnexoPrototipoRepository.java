package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.AnexoBanner;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.AnexoPrototipo;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Banner;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Prototipo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnexoPrototipoRepository extends JpaRepository<AnexoPrototipo, Long> {
    AnexoPrototipo findByPrototipoAndNomeAnexo(Prototipo banner, String nomeAnexo);
}
