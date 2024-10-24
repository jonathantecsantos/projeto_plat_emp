package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Evento;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.TipoEvento;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.EventoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.EventoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.TipoEventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private TipoEventoRepository tipoEventoRepository;

    public List<Evento> listarTodos() {
        return eventoRepository.findAll();
    }

    public Optional<Evento> buscarPorId(Integer id) {
        return eventoRepository.findById(id);
    }

    public Evento criarEvento(EventoRecord eventoRecord) throws Exception {
        Evento evento = new Evento();
        evento.setDataInicio(eventoRecord.dataInicio());
        evento.setDataFim(eventoRecord.dataFim());
        Optional<TipoEvento> eventoOptional = tipoEventoRepository.findById(eventoRecord.idEvento());
        if(eventoOptional.isPresent()){
            evento.setTipoEvento(eventoOptional.get());
        }else{
            throw new Exception("Evento não encontrado");
        }
        return eventoRepository.save(evento);
    }

    public Evento atualizarEvento(Integer id, EventoRecord eventoAtualizado) {
        Optional<Evento> eventoExistente = eventoRepository.findById(id);

        if (eventoExistente.isPresent()) {
            Evento evento = eventoExistente.get();
            evento.setDataInicio(eventoAtualizado.dataInicio());
            evento.setDataFim(eventoAtualizado.dataFim());
            return eventoRepository.save(evento);
        }

        throw new RuntimeException("Evento não encontrado com ID: " + id);
    }

    public void deletarEvento(Integer id) {
        eventoRepository.deleteById(id);
    }
}

