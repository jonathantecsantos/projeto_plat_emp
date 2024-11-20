package com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.model.Coordenador;

public record CoordenadorRecord(Long id,
                                String nome,
                                String cpf,
                                String email) {

    public CoordenadorRecord(Coordenador coordenador){
        this(coordenador.getId(), coordenador.getNome(), coordenador.getCpf(), coordenador.getEmail());
    }
}
