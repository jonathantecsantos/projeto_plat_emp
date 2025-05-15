package com.plataforma.empreendedorismo.plataformaempreendedorismo.service;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Evento;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.TipoEvento;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.evento.EventoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.EventoRepository;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.repository.TipoEventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.exceptions.EventoEncontradoException;
import util.exceptions.EventoNaoEncontradoException;

import java.time.*;
import java.util.*;

@Service
public class EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Autowired
    private TipoEventoRepository tipoEventoRepository;

    public List<Evento> listarTodos() {
        return eventoRepository.findAll();
    }

    public Optional<Evento> buscarPorTipoEventoId(Long id) {
        return eventoRepository.findByTipoEventoId(id);
    }

    public Evento criarEvento(EventoRecord eventoRecord) throws Exception {
        if(eventoRepository.findByTipoEventoId(eventoRecord.idEvento()).isEmpty()){
            Evento evento = new Evento();
            Date dataInicio = toDate(eventoRecord.dataInicio());
            Date dataFim = toDate(eventoRecord.dataFim());
            evento.setDataInicio(dataInicio);
            evento.setDataFim(dataFim);
            Optional<TipoEvento> eventoOptional = tipoEventoRepository.findById(eventoRecord.idEvento());
            if (eventoOptional.isPresent()) {
                evento.setTipoEvento(eventoOptional.get());
            } else {
                throw new EventoNaoEncontradoException("Evento não encontrado");
            }
            return eventoRepository.save(evento);
        }else{
            throw new EventoEncontradoException("Já existe um evento cadastrado.");
        }
    }

    public Evento atualizarEvento(Long id, EventoRecord eventoAtualizado) {
        Optional<Evento> eventoExistente = eventoRepository.findByTipoEventoId(id);

        if (eventoExistente.isPresent()) {
            Evento evento = eventoExistente.get();

            Date dataInicio = toDate(eventoAtualizado.dataInicio());
            Date dataFim = toDate(eventoAtualizado.dataFim());

            evento.setDataInicio(dataInicio);
            evento.setDataFim(dataFim);
            return eventoRepository.save(evento);
        }

        throw new RuntimeException("Evento não encontrado com ID: " + id);
    }

    private Date toDate(LocalDate localDate) {
        return Date.from(localDate
                .atStartOfDay(ZoneId.of("America/Sao_Paulo"))
                .toInstant());
    }

    public void deletarEvento(Long id) {
        eventoRepository.deleteById(id);
    }

    public boolean isEventoValido(Long id) {
        Optional<Evento> eventoOptional = eventoRepository.findByTipoEventoId(id);

        if (eventoOptional.isPresent()) {
            Evento evento = eventoOptional.get();

            LocalDateTime dataInicio = evento.getDataInicio().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();

            LocalDateTime dataFim = evento.getDataFim().toInstant()
                    .atZone(ZoneId.systemDefault())
                    .toLocalDateTime();

            LocalDateTime agora = LocalDateTime.now();

            return (agora.isAfter(dataInicio) || agora.isEqual(dataInicio)) &&
                    (agora.isBefore(dataFim) || agora.isEqual(dataFim));
        }else {
            throw new RuntimeException("Evento não encontrado com ID: " + id);
        }
    }
}

