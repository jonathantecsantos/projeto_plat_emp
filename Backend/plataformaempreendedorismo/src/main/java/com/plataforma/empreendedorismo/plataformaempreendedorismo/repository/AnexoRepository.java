package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.AnexoBanner;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnexoRepository extends JpaRepository<AnexoBanner, Long> {
    AnexoBanner findByBannerAndNomeAnexo(Banner banner, String nomeAnexo);
}
