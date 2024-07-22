package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Avaliador;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorEditarRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorCadastroRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.AvaliadorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AvaliadorService {

    @Autowired
    private AvaliadorRepository avaliadorRepository;

    @Transactional
    public void criarAvaliador(AvaliadorCadastroRecord avaliadorCadastroRecord) {
        avaliadorRepository.save(new Avaliador(avaliadorCadastroRecord));
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
    public void editarProfessor(AvaliadorEditarRecord avaliadorEditarRecord) {
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
        if(avaliadorEditarRecord.formatosAvaliacoes()!= null){
            avaliador.setFormatosAvaliacoes(avaliadorEditarRecord.formatosAvaliacoes());
        }
    }
}
