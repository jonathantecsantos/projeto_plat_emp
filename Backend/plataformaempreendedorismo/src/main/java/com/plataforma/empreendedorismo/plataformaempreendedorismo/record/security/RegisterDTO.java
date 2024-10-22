package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.security;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Role;

public record RegisterDTO(String login, String senha, Role role) {
}
