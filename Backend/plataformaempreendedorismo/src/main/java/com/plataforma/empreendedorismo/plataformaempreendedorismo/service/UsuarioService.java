package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.EnumRole;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Usuario;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.RedefinirSenhaUsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.UsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import util.exceptions.RoleIncorretaException;
import util.exceptions.SenhaIncorretaException;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Value("${senha.padrao.novo.usuario}")
    private String senhaPadrao;

    @Transactional
    public UsuarioRecord criarUsuario(String email, EnumRole enumRole) {
        String encryptedPassword = new BCryptPasswordEncoder().encode(senhaPadrao);
        Usuario newUser = new Usuario(email, encryptedPassword, enumRole);
        usuarioRepository.save(newUser);
        return new UsuarioRecord(newUser.getLogin(),senhaPadrao);
    }

    @Transactional
    public UsuarioRecord redefinirSenha(RedefinirSenhaUsuarioRecord usuario) throws SenhaIncorretaException {

        Usuario usuarioReference = usuarioRepository.getReferenceByLogin(usuario.emailUsuario());

        if (usuarioReference != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            if (passwordEncoder.matches(usuario.senhaAntiga(), usuarioReference.getSenha())) {
                String encryptedPassword = passwordEncoder.encode(usuario.novaSenha());
                usuarioReference.setSenha(encryptedPassword);
                usuarioRepository.save(usuarioReference);
                return new UsuarioRecord(usuarioReference.getLogin(), usuario.novaSenha());
            } else {
                throw new SenhaIncorretaException("Senha antiga incorreta.");
            }
        }
        return null;
    }

    @Transactional
    public UsuarioRecord resetarSenhaPadrao(String emailUsuario, String role) throws RoleIncorretaException {
        try {
            EnumRole userRole = EnumRole.valueOf(role.toUpperCase());

            Usuario usuarioReference = usuarioRepository.getReferenceByLogin(emailUsuario);

            if (usuarioReference != null) {
                BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
                String encryptedPassword = passwordEncoder.encode(senhaPadrao);
                usuarioReference.setSenha(encryptedPassword);
                usuarioRepository.save(usuarioReference);
                return new UsuarioRecord(usuarioReference.getLogin(), senhaPadrao);
            } else {
                return criarUsuario(emailUsuario, userRole);
            }
        }catch (IllegalArgumentException e){
            throw new RoleIncorretaException("Role informada é inválida.");
        }
    }

}
