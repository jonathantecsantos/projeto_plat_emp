package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador;

import jakarta.validation.constraints.NotNull;

public record CoordenadorEditarRecord(

        @NotNull
        Long id,
        String nome,
        String cpf,
        String email) {
}
