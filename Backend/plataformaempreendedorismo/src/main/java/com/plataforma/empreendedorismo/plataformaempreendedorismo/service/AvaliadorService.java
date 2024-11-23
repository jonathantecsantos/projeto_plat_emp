package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Avaliador;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.EnumRole;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.FormatoAvaliacao;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.usuario.UsuarioRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AvaliadorRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.FormatoAvaliacaoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AvaliadorService {

    @Autowired
    private AvaliadorRepository avaliadorRepository;

    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private FormatoAvaliacaoRepository formatoAvaliacaoRepository;

    @Transactional
    public void criarAvaliador(AvaliadorCadastroRecord avaliadorCadastroRecord) {
        if(!avaliadorCadastroRecord.idFormatosAvaliacoes().isEmpty()){
            List<FormatoAvaliacao> listFormatos = processarFormatosAvaliacao(avaliadorCadastroRecord.idFormatosAvaliacoes());
            avaliadorRepository.save(new Avaliador(avaliadorCadastroRecord, listFormatos));
        }
    }

    private List<FormatoAvaliacao> processarFormatosAvaliacao(List<Long> avaliadorCadastroRecord) {
        List<FormatoAvaliacao> listFormatos = new ArrayList<>();
        for (Long idFormatoAvaliacao : avaliadorCadastroRecord) {
            Optional<FormatoAvaliacao> formatoOpt = formatoAvaliacaoRepository.findById(idFormatoAvaliacao);
            formatoOpt.ifPresent(listFormatos::add);
        }
        return listFormatos;
    }

    public AvaliadorRecord buscarAvaliadorPorId(Long id) {
        Optional<Avaliador> avaliadorOptional = avaliadorRepository.findById(id);
        if(avaliadorOptional.isPresent()){
            Avaliador avaliador = avaliadorOptional.get();
            return new AvaliadorRecord(avaliador);
        }
        return null;
    }

    @Transactional
    public void editarAvaliador(AvaliadorEditarRecord avaliadorEditarRecord) {
        Avaliador avaliador = avaliadorRepository.getReferenceById(avaliadorEditarRecord.id());
        atualizarAvaliador(avaliador, avaliadorEditarRecord);
    }

    private void atualizarAvaliador(Avaliador avaliador, AvaliadorEditarRecord avaliadorEditarRecord) {
        if(avaliadorEditarRecord.nome() != null){
            avaliador.setNome(avaliadorEditarRecord.nome().toUpperCase());
        }
        if(avaliadorEditarRecord.instituicao() != null){
            avaliador.setInstituicao(avaliadorEditarRecord.instituicao());
        }
        if(avaliadorEditarRecord.email() != null){
            avaliador.setEmail(avaliadorEditarRecord.email());
        }
        if(!avaliadorEditarRecord.idFormatosAvaliacoes().isEmpty()){
            List<FormatoAvaliacao> listFormatos = getFormatoAvaliacaos(avaliadorEditarRecord);
            avaliador.setFormatosAvaliacoes(listFormatos);
        }
    }

    private List<FormatoAvaliacao> getFormatoAvaliacaos(AvaliadorEditarRecord avaliadorEditarRecord) {
        List<FormatoAvaliacao> listFormatos = processarFormatosAvaliacao(avaliadorEditarRecord.idFormatosAvaliacoes());
        return listFormatos;
    }

    @Transactional
    public UsuarioRecord criarAvaliadorAndCriarAcesso(AvaliadorCadastroRecord avaliadorCadastroRecord) {
        if(!avaliadorCadastroRecord.idFormatosAvaliacoes().isEmpty()){
            List<FormatoAvaliacao> listFormatos = processarFormatosAvaliacao(avaliadorCadastroRecord.idFormatosAvaliacoes());
            Avaliador avaliador = avaliadorRepository.save(new Avaliador(avaliadorCadastroRecord,listFormatos));
            return usuarioService.criarUsuario(avaliador,avaliadorCadastroRecord.email(), EnumRole.ROLE_AVALIADOR);
        }
        return null;
    }
}
