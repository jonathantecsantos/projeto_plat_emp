package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Avaliador;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Coordenador;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.EnumRole;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Usuario;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador.CoordenadorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador.CoordenadorEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador.CoordenadorListaRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador.CoordenadorRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.UsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.CoordenadorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.exceptions.UsuarioNaoEncontradoException;

import java.util.Optional;

@Service
public class CoordenadorService {

    @Autowired
    private CoordenadorRepository coordenadorRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Transactional
    public UsuarioRecord persistirCoordenadorAndCriarAcesso(CoordenadorCadastroRecord coordenadorCadastroRecord) {
        Coordenador coordenador = coordenadorRepository.save(new Coordenador(coordenadorCadastroRecord));
        return usuarioService.criarUsuario(coordenador, coordenador.getEmail(), EnumRole.ROLE_COORDENADOR);

    }

    @Transactional
    public UsuarioRecord criarCoordenaorAndCriarAcesso(CoordenadorCadastroRecord coordenadorCadastroRecord) {
        Coordenador coordenador = coordenadorRepository.save(new Coordenador(coordenadorCadastroRecord));
        return usuarioService.criarUsuario(coordenador,coordenadorCadastroRecord.email(), EnumRole.ROLE_COORDENADOR);

    }

    public CoordenadorRecord buscarCoordenadorPorId(Long id) {
        Optional<Coordenador> coordenadorOptional = coordenadorRepository.findById(id);
        if(coordenadorOptional.isPresent()){
            Coordenador coordenador = coordenadorOptional.get();
            return new CoordenadorRecord(coordenador);
        }

        return null;
    }

    @Transactional
    public void editarCoordenador(CoordenadorEditarRecord coordenadorEditarRecord) {
        Coordenador coordenador = coordenadorRepository.getReferenceById(coordenadorEditarRecord.id());
        atualizarCoordenador(coordenador, coordenadorEditarRecord);

    }

    private void atualizarCoordenador(Coordenador coordenador, CoordenadorEditarRecord coordenadorEditarRecord) {
        if(coordenadorEditarRecord.nome() != null){
            coordenador.setNome(coordenadorEditarRecord.nome().toUpperCase());
        }
        if(coordenadorEditarRecord.cpf() != null){
            coordenador.setCpf(coordenadorEditarRecord.cpf());
        }
        if(coordenadorEditarRecord.email() != null){
            coordenador.setEmail(coordenadorEditarRecord.email().toUpperCase());
        }

    }
    @Transactional
    public void apagarCoordenadorAndUsuario(Long id) throws UsuarioNaoEncontradoException {
        Coordenador coordenador = coordenadorRepository.getReferenceById(id);
        Usuario usuario = usuarioService.buscarUsuarioPorLogin(coordenador.getEmail());
        if(usuario != null){
            usuarioService.apagarUsuario(usuario);
            coordenadorRepository.deleteById(id);
        }else {
            throw new UsuarioNaoEncontradoException ("Usuário não encotrado");
        }
    }
}
