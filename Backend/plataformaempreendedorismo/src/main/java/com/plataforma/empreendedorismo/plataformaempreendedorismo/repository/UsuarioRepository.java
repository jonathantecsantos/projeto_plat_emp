package com.plataforma.empreendedorismo.plataformaempreendedorismo.repository;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    UserDetails findByLogin(String login);

}
