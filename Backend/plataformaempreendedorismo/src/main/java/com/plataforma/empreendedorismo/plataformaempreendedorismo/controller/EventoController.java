package com.plataforma.empreendedorismo.plataformaempreendedorismo.controller;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Evento;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.EventoRecord;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.service.EventoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/eventos")
@Tag(name="Evento")
@SecurityRequirement(name = "bearerToken")
public class EventoController {

    @Autowired
    private EventoService eventoService;

    @Operation(summary = "Busca dados do Evento", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "404", description = "Evento não encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados"),
    })
    @GetMapping
    public List<Evento> listarTodos() {
        return eventoService.listarTodos();
    }

    @Operation(summary = "Busca dados do Evento por ID", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "404", description = "Evento não encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados"),
    })
    @GetMapping("/{id}")
    public ResponseEntity<Evento> buscarPorId(@PathVariable Long id) {
        Optional<Evento> evento = eventoService.buscarPorId(id);

        if (evento.isPresent()) {
            return ResponseEntity.ok(evento.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Cadastrar Evento", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Evento cadastrado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao criar Evento")
    })
    @PostMapping
    public Evento criarEvento(@RequestBody EventoRecord evento) throws Exception {
        return eventoService.criarEvento(evento);
    }

    @Operation(summary = "Editar Evento", method = "PUT")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Evento editado com sucesso"),
            @ApiResponse(responseCode = "500", description = "Erro ao editar evento")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Evento> atualizarEvento(@PathVariable Long id, @RequestBody EventoRecord eventoAtualizado) {
        try {
            Evento evento = eventoService.atualizarEvento(id, eventoAtualizado);
            return ResponseEntity.ok(evento);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Apagar Evento", method = "DELETE")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Evento deletado com sucesso"),
            @ApiResponse(responseCode = "204", description = "Evento não encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarEvento(@PathVariable Long id) {
        eventoService.deletarEvento(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Validar Evento", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Dados encontrados com sucesso"),
            @ApiResponse(responseCode = "404", description = "Evento não encontrada"),
            @ApiResponse(responseCode = "500", description = "Erro ao buscar os dados"),
    })
    @GetMapping("/{id}/validade")
    public ResponseEntity<Boolean> validarEvento(@PathVariable Long id) {
        try {
            boolean valido = eventoService.isEventoValido(id);
            return ResponseEntity.ok(valido);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
