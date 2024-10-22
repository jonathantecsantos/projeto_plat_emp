package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.infra.security.TokenService;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Usuario;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.security.RegisterDTO;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.security.DadosAutenticacaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.security.DadosTokenJWT;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
public class  AutenticacaoController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @CrossOrigin(allowedHeaders = "*")
    @PostMapping
    public ResponseEntity efetuarLogin(@RequestBody @Valid DadosAutenticacaoRecord dados){
        var authenticationToken = new UsernamePasswordAuthenticationToken(dados.login(), dados.senha());
        var authentication = manager.authenticate(authenticationToken);
        var tokenJWT = tokenService.gerarToken((Usuario) authentication.getPrincipal());
        return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
        if(this.usuarioRepository.findByLogin(data.login()) != null) return ResponseEntity.badRequest().build();

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
        Usuario newUser = new Usuario(data.login(), encryptedPassword, data.role());

        this.usuarioRepository.save(newUser);

        return ResponseEntity.ok().build();
    }
}
