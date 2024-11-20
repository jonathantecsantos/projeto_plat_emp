package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Coordenador;

public record CoordenadorListaRecord(
        Long id,
        String nome,
        String cpf,
        String email) {
    public CoordenadorListaRecord(Coordenador coordenador){
        this(coordenador.getId(), coordenador.getNome(), coordenador.getCpf(), coordenador.getEmail());
    }
}
