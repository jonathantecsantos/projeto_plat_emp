package com.plataforma.empreendedorismo.plataformaempreendedorismo.infra.config;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import util.exceptions.EventoEncontradoException;
import util.exceptions.EventoNaoEncontradoException;

import java.util.Map;

@RestControllerAdvice
public class ExceptionHandlerAdvice {

    @ExceptionHandler(EventoNaoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> handleEventoNaoEncontrado(EventoNaoEncontradoException ex) {
        return Map.of("message", ex.getMessage());
    }

    @ExceptionHandler(EventoEncontradoException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public Map<String, String> handleEventoEncontrado(EventoEncontradoException ex) {
        return Map.of("message", ex.getMessage());
    }
}
