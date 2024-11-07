package com.plataforma.empreendedorismo.plataformaempreendedorismo.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${api.security.token.secret}")
    private String secret;
    public String gerarToken(Usuario usuario){
        try {
            var algoritimo = Algorithm.HMAC256(secret);

            Long id = null;
            String email = null;
            String username = null;

            if (usuario.getAvaliador() != null) {
                id = usuario.getAvaliador().getId();
                email = usuario.getAvaliador().getEmail();
                username = usuario.getAvaliador().getNome();
            } else if (usuario.getProfessor() != null) {
                id = usuario.getProfessor().getId();
                email = usuario.getProfessor().getEmail();
                username = usuario.getProfessor().getNome();
            } else if (usuario.getAluno() != null) {
                id = usuario.getAluno().getId();
                email = usuario.getAluno().getEmail();
                username = usuario.getAluno().getNome();
            }else if(usuario.getAdministrador() != null) {
                id = usuario.getAdministrador().getId();
                email = usuario.getAdministrador().getEmail();
                username = usuario.getAdministrador().getNome();
            }else if(usuario.getCoordenador() != null) {
                id = usuario.getCoordenador().getId();
                email = usuario.getCoordenador().getEmail();
                username = usuario.getCoordenador().getNome();
            }

            return JWT.create()
                    .withIssuer("Plataforma Empreendedorismo")
                    .withClaim("id", id)
                    .withClaim("email", email)
                    .withClaim("username",username)
                    .withClaim("enumRole", usuario.getEnumRole().name())
                    .withExpiresAt(dataExpiracao())
                    .sign(algoritimo);
        } catch (JWTCreationException exception){
            throw new RuntimeException("Erro ao gerar Token", exception);
        }
    }

    public String getSubject (String tokenJWT){
        try {
            var algoritimo = Algorithm.HMAC256(secret);
            return JWT.require(algoritimo)
                    .withIssuer("Plataforma Empreendedorismo")
                    .build()
                    .verify(tokenJWT)
                    .getSubject();
        } catch (JWTVerificationException exception){
            throw new RuntimeException("Token inválido ou expirado!");
        }
    }
    private Instant dataExpiracao() {
        return LocalDateTime.now().plusHours(23).toInstant(ZoneOffset.of("-03:00"));
    }
}
