package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.avaliador.AvaliadorCadastroRecord;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity(name="avaliador")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Avaliador {

    private static final long serialVersionUID = -5969290162613347430L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String instituicao;

    private String nome;

    private String email;

    @OneToOne(mappedBy = "avaliador")
    private Usuario usuario;

    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "avaliador_formato",
            joinColumns = {@JoinColumn(name = "id_avaliador", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "id_formato_avaliacao", referencedColumnName = "id")}
    )
    private List<FormatoAvaliacao> formatosAvaliacoes = new ArrayList<>();

    public Avaliador(AvaliadorCadastroRecord avaliadorCadastroRecord, List<FormatoAvaliacao> formatosAvaliacoes) {
        this.instituicao = avaliadorCadastroRecord.instituicao();
        this.nome = avaliadorCadastroRecord.nome().toUpperCase();
        this.email = avaliadorCadastroRecord.email();
        this.formatosAvaliacoes = formatosAvaliacoes;
    }

}
