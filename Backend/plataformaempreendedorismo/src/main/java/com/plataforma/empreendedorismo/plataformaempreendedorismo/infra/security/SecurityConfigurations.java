package com.plataforma.empreendedorismo.plataformaempreendedorismo.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurations {

    @Autowired
    private SecurityFilter securityFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        return http.csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy((SessionCreationPolicy.STATELESS)))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/api-docs",
                                "/v3/api-docs/**",
                                "/v2/api-docs",
                                "/swagger-resources/**",
                                "/webjars/**",
                                "/api-docs/swagger-config"

                        ).permitAll()
                        .requestMatchers(HttpMethod.POST,"/login").permitAll()
                        .requestMatchers(HttpMethod.POST,"/login/register").permitAll()

                        //Alunos
                        .requestMatchers(HttpMethod.GET,"/alunos").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.POST,"/alunos/cadastrar").hasAnyRole("ADMIN","COORDENADOR")
                        .requestMatchers(HttpMethod.DELETE,"/alunos/apagar/**").hasAnyRole("ADMIN","COORDENADOR")
                        //.requestMatchers(HttpMethod.GET,"/alunos/{id}").hasRole("ADMIN")
                        //.requestMatchers(HttpMethod.GET,"/alunos/editar").hasRole("ADMIN")

                        //Avaliacao
                        .requestMatchers(HttpMethod.GET, "/avaliacoes/{idFormato}", "/avaliacoes/formatos", "/avaliacoes/equipes", "/avaliacoes/formato/**").hasAnyRole("ADMIN", "AVALIADOR")
                        .requestMatchers(HttpMethod.POST, "/avaliacoes/").hasAnyRole("ADMIN", "AVALIADOR")
                        .requestMatchers(HttpMethod.PUT, "/avaliacoes/editar").hasAnyRole("ADMIN", "AVALIADOR")

                        //Avaliadores
                        .requestMatchers(HttpMethod.GET, "/avaliadores", "/avaliadores/{id}").hasAnyRole("ADMIN", "AVALIADOR","COORDENADOR")
                        .requestMatchers(HttpMethod.POST, "/avaliadores/cadastrar").hasAnyRole("ADMIN","COORDENADOR")
                        .requestMatchers(HttpMethod.DELETE, "/avaliadores/apagar/{id}").hasAnyRole("ADMIN","COORDENADOR")
                        .requestMatchers(HttpMethod.PUT, "/avaliadores/editar").hasAnyRole("ADMIN", "COORDENADOR")

                        //Banner
                        .requestMatchers(HttpMethod.POST, "/banner/cadastrar").hasAnyRole("ADMIN","COORDENADOR", "ALUNO")
                        .requestMatchers(HttpMethod.GET, "/banner/{idEquipe}").hasAnyRole("ADMIN", "COORDENADOR", "PROFESSOR",  "ALUNO")
                        .requestMatchers(HttpMethod.PUT, "/banner/editar").hasAnyRole("ADMIN", "COORDENADOR", "ALUNO")

                        //Equipe
                        .requestMatchers(HttpMethod.GET, "/equipes/{id}").hasAnyRole("ADMIN", "COORDENADOR", "PROFESSOR",  "ALUNO")
                        .requestMatchers(HttpMethod.GET, "/equipes").hasAnyRole("ADMIN", "COORDENADOR")
                        .requestMatchers(HttpMethod.PUT, "/equipes/editar").hasAnyRole("ADMIN", "COORDENADOR")

                        //Professor
                        .requestMatchers(HttpMethod.POST, "/professores/cadastrar").hasAnyRole("ADMIN", "COORDENADOR")
                        .requestMatchers(HttpMethod.GET, "/professores").hasAnyRole("ADMIN","COORDENADOR")
                        .requestMatchers(HttpMethod.GET, "/professores/{id}").hasAnyRole("ADMIN", "COORDENADOR", "PROFESSOR")
                        .requestMatchers(HttpMethod.DELETE, "/professores/apagar/{id}").hasAnyRole("ADMIN", "COORDENADOR")
                        .requestMatchers(HttpMethod.PUT, "/professores/editar").hasAnyRole("ADMIN", "COORDENADOR", "PROFESSOR")

                        //Prototipo
                        .requestMatchers(HttpMethod.POST, "/prototipo/cadastrar").hasAnyRole("ADMIN", "COORDENADOR", "ALUNO")
                        .requestMatchers(HttpMethod.GET, "/prototipo/tipos-anexo").hasAnyRole("ADMIN", "COORDENADOR", "ALUNO")
                        .requestMatchers(HttpMethod.GET, "/prototipo/{idEquipe}").hasAnyRole("ADMIN", "COORDENADOR", "PROFESSOR",  "ALUNO")
                        .requestMatchers(HttpMethod.PUT, "/prototipo/editar").hasAnyRole("ADMIN", "COORDENADOR", "ALUNO")

                        //Relatório
                        .requestMatchers("/relatorios/classificacao").hasAnyRole("ADMIN")
                        .requestMatchers("/relatorios/classificacao-por-formato/**").hasAnyRole("ADMIN")
                        .requestMatchers("/relatorios/notas-equipe/**").hasAnyRole("ADMIN")
                        .requestMatchers("/relatorios/itens-relatorio").hasAnyRole("ADMIN")
                        .requestMatchers("/relatorios/relatorio-geral").hasAnyRole("ADMIN")

                        //Eventos
                        .requestMatchers("/eventos/{id}/validade").permitAll()
                        .requestMatchers("/eventos/**").hasRole("ADMIN")

                        .anyRequest().authenticated()
                )

                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception{
        return configuration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

}

