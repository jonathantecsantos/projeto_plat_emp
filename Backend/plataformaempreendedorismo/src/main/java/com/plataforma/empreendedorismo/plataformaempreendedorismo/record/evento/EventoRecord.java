package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.evento;

import java.time.LocalDate;

public record EventoRecord(LocalDate dataInicio, LocalDate dataFim, Long idEvento) {
}
