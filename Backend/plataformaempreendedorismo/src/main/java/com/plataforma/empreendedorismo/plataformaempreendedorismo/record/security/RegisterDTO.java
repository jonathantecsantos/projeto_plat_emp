package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.security;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.EnumRole;

public record RegisterDTO(
        String login,
        String senha,
        EnumRole enumRole) {
}
