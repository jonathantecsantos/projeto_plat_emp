package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Coordenador;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.EnumRole;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador.CoordenadorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.UsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.CoordenadorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
