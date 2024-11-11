package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.*;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.RedefinirSenhaUsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.ResetarSenhaUsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.UsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.*;
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

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private CoordenadorRepository coordenadorRepository;

    @Autowired
    private AvaliadorRepository avaliadorRepository;

    @Autowired
    private ProfessorRepository professorRepository;

    @Value("${senha.padrao.novo.usuario.aluno}")
    private String senhaPadraoAluno;

    @Value("${senha.padrao.novo.usuario.professor}")
    private String senhaPadraoProfessor;

    @Value("${senha.padrao.novo.usuario.avaliador}")
    private String senhaPadraoAvaliador;

    @Value("${senha.padrao.novo.usuario.coordenador}")
    private String senhaPadraoCoordenador;

    @Value("${senha.padrao.novo.usuario.coordenador}")
    private String senhaPadraoAdministrador;

    @Transactional
    public UsuarioRecord criarUsuario(Object entidade, String email, EnumRole enumRole) {

        Usuario newUser = new Usuario();

        if (entidade instanceof Avaliador) {
            String encryptedPassword = new BCryptPasswordEncoder().encode(senhaPadraoAvaliador);
            newUser = new Usuario(email, encryptedPassword, enumRole, (Avaliador) entidade );
            usuarioRepository.save(newUser);
            return new UsuarioRecord(newUser.getLogin(),senhaPadraoAvaliador);
        } else if (entidade instanceof Professor) {
            String encryptedPassword = new BCryptPasswordEncoder().encode(senhaPadraoProfessor);
            newUser = new Usuario(email, encryptedPassword, enumRole, (Professor) entidade );
            usuarioRepository.save(newUser);
            return new UsuarioRecord(newUser.getLogin(),senhaPadraoProfessor);
        } else if (entidade instanceof Aluno) {
            String encryptedPassword = new BCryptPasswordEncoder().encode(senhaPadraoAluno);
            newUser = new Usuario(email, encryptedPassword, enumRole, (Aluno) entidade );
            usuarioRepository.save(newUser);
            return new UsuarioRecord(newUser.getLogin(),senhaPadraoAluno);
        } else if (entidade instanceof Coordenador) {
            String encryptedPassword = new BCryptPasswordEncoder().encode(senhaPadraoCoordenador);
            newUser = new Usuario(email, encryptedPassword, enumRole, (Coordenador) entidade );
            usuarioRepository.save(newUser);
            return new UsuarioRecord(newUser.getLogin(),senhaPadraoCoordenador);
        } else {
            throw new IllegalArgumentException("Entidade desconhecida para o construtor de Usuario");
        }

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
    public UsuarioRecord resetarSenhaPadrao(ResetarSenhaUsuarioRecord data) throws RoleIncorretaException {
        try {
            EnumRole userRole = EnumRole.valueOf(data.role().toUpperCase());

            Usuario usuarioReference = usuarioRepository.getReferenceByLogin(data.emailUsuario());

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

            if (usuarioReference != null) {
                UsuarioRecord newUsuarioRecord = resetUsuarioExistente(userRole, passwordEncoder, usuarioReference);
                if (newUsuarioRecord != null) return newUsuarioRecord;
            } else {
                if(userRole.equals(EnumRole.ROLE_ALUNO)) {
                    Aluno aluno = alunoRepository.getReferenceById(data.idObjeto());
                    return criarUsuario(aluno, aluno.getEmail(),userRole);
                }
                if(userRole.equals(EnumRole.ROLE_ADMIN)) {
                    Administrador administrador = administradorRepository.getReferenceById(data.idObjeto());
                    return criarUsuario(administrador, administrador.getEmail(),userRole);
                }
                if(userRole.equals(EnumRole.ROLE_COORDENADOR)) {
                    Coordenador coordenador = coordenadorRepository.getReferenceById(data.idObjeto());
                    return criarUsuario(coordenador, coordenador.getEmail(),userRole);
                }
                if(userRole.equals(EnumRole.ROLE_PROFESSOR)) {
                    Professor professor = professorRepository.getReferenceById(data.idObjeto());
                    return criarUsuario(professor, professor.getEmail(),userRole);
                }
                if(userRole.equals(EnumRole.ROLE_AVALIADOR)) {
                    Avaliador avaliador = avaliadorRepository.getReferenceById(data.idObjeto());
                    return criarUsuario(avaliador, avaliador.getEmail(),userRole);
                }
            }
        }catch (IllegalArgumentException e){
            throw new RoleIncorretaException("Role informada é inválida.");
        }

        return null;
    }

    private UsuarioRecord resetUsuarioExistente(EnumRole userRole, BCryptPasswordEncoder passwordEncoder, Usuario usuarioReference) {
        if(userRole.equals(EnumRole.ROLE_ALUNO)) {
            String encryptedPassword = passwordEncoder.encode(senhaPadraoAluno);
            usuarioReference.setSenha(encryptedPassword);
            usuarioRepository.save(usuarioReference);
            return new UsuarioRecord(usuarioReference.getLogin(), senhaPadraoAluno);
        }
        if(userRole.equals(EnumRole.ROLE_ADMIN)) {
            String encryptedPassword = passwordEncoder.encode(senhaPadraoAdministrador);
            usuarioReference.setSenha(encryptedPassword);
            usuarioRepository.save(usuarioReference);
            return new UsuarioRecord(usuarioReference.getLogin(), senhaPadraoAdministrador);
        }
        if(userRole.equals(EnumRole.ROLE_COORDENADOR)) {
            String encryptedPassword = passwordEncoder.encode(senhaPadraoCoordenador);
            usuarioReference.setSenha(encryptedPassword);
            usuarioRepository.save(usuarioReference);
            return new UsuarioRecord(usuarioReference.getLogin(), senhaPadraoCoordenador);
        }
        if(userRole.equals(EnumRole.ROLE_PROFESSOR)) {
            String encryptedPassword = passwordEncoder.encode(senhaPadraoProfessor);
            usuarioReference.setSenha(encryptedPassword);
            usuarioRepository.save(usuarioReference);
            return new UsuarioRecord(usuarioReference.getLogin(), senhaPadraoProfessor);
        }
        if(userRole.equals(EnumRole.ROLE_AVALIADOR)) {
            String encryptedPassword = passwordEncoder.encode(senhaPadraoAvaliador);
            usuarioReference.setSenha(encryptedPassword);
            usuarioRepository.save(usuarioReference);
            return new UsuarioRecord(usuarioReference.getLogin(), senhaPadraoAvaliador);
        }
        return null;
    }

}
