package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.infra.security.TokenService;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Usuario;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.security.DadosAutenticacaoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.security.DadosTokenJWT;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.RedefinirSenhaUsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.ResetarSenhaUsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.UsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.UsuarioRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import util.exceptions.RoleIncorretaException;
import util.exceptions.SenhaIncorretaException;

@RestController
@RequestMapping("/auth")
public class  AutenticacaoController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    @CrossOrigin(allowedHeaders = "*")
    @Operation(summary = "Efetuar Login", method = "POST")
    @PostMapping
    public ResponseEntity<Object> efetuarLogin(@RequestBody @Valid DadosAutenticacaoRecord dados) throws InternalAuthenticationServiceException, BadCredentialsException {
        var authenticationToken = new UsernamePasswordAuthenticationToken(dados.login(), dados.senha());
        try{
            var authentication = manager.authenticate(authenticationToken);
            var tokenJWT = tokenService.gerarToken((Usuario) authentication.getPrincipal());
            return ResponseEntity.ok(new DadosTokenJWT(tokenJWT));
        } catch (BadCredentialsException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (InternalAuthenticationServiceException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Usuário inexistente ou senha inválida!");
        }
    }

//    @Operation(summary = "Registarar Usuario", method = "POST")
//    @PostMapping("/register")
//    public ResponseEntity register(@RequestBody @Valid RegisterDTO data){
//        if(this.usuarioRepository.findByLogin(data.login()) != null) return ResponseEntity.badRequest().build();
//
//        String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
//        Usuario newUser = new Usuario(data.login(), encryptedPassword, data.enumRole());
//
//        this.usuarioRepository.save(newUser);
//
//        return ResponseEntity.ok().build();
//    }

    @Operation(summary = "Redefinir Senha", method = "POST")
    @SecurityRequirement(name = "bearerToken")
    @PostMapping("/redefinir-senha")
    public ResponseEntity<Object> redefinir(@RequestBody @Valid RedefinirSenhaUsuarioRecord data){
        try{
            UsuarioRecord usuarioRecord = usuarioService.redefinirSenha(data);
            return ResponseEntity.ok(usuarioRecord);
        }catch(SenhaIncorretaException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @Operation(summary = "Resetar Senha", method = "POST")
    @SecurityRequirement(name = "bearerToken")
    @PostMapping("/resetar-senha")
    public ResponseEntity<Object> redefinir(@RequestBody ResetarSenhaUsuarioRecord data){
        try{
            UsuarioRecord usuarioRecord = usuarioService.resetarSenhaPadrao(data);
            return ResponseEntity.ok(usuarioRecord);
        }catch(RoleIncorretaException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }


}
