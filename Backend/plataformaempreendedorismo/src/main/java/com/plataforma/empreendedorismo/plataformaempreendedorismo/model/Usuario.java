package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity(name="usuario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String login;

    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private EnumRole enumRole;

    @OneToOne
    @JoinColumn(name = "avaliador_id")
    private Avaliador avaliador;

    @OneToOne
    @JoinColumn(name = "professor_id")
    private Professor professor;

    @OneToOne
    @JoinColumn(name = "aluno_id")
    private Aluno aluno;

    @OneToOne
    @JoinColumn(name = "administrador_id")
    private Administrador administrador;

    @OneToOne
    @JoinColumn(name = "coordenador_id")
    private Coordenador coordenador;

    public Usuario(String login, String encryptedPassword, EnumRole enumRole) {
        this.login = login;
        this.senha = encryptedPassword;
        this.enumRole = enumRole;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.enumRole.name()));
    }

    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public String getUsername() {
        return this.login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
