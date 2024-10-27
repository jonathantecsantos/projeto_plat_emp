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
            return JWT.create()
                    .withIssuer("Plataforma Empreendedorismo")
                    .withSubject(usuario.getLogin())
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
