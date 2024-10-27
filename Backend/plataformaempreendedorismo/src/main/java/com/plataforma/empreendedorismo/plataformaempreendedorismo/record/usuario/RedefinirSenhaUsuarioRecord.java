package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RedefinirSenhaUsuarioRecord(
        @NotNull
        @NotBlank
        String emailUsuario,
        @NotNull
        @NotBlank
        String senhaAntiga,
        @NotNull
        @NotBlank
        String novaSenha) {
}
