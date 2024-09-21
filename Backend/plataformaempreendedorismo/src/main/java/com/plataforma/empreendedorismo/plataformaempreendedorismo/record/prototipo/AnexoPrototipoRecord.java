package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.prototipo;

import org.springframework.web.multipart.MultipartFile;

public record AnexoPrototipoRecord(
        MultipartFile file,
        Long tipoAnexoId
) {
}
