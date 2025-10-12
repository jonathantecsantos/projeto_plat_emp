package com.plataforma.empreendedorismo.plataformaempreendedorismo.infra.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
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

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<String> handleMaxSizeException(MaxUploadSizeExceededException ex) {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body("A soma do tamanho dos arquivos não pode exceder 30MB.");
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Erro inesperado: " + ex.getMessage());
    }
}
