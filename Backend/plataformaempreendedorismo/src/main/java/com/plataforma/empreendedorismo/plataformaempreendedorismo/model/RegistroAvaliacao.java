package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity(name="registro_avaliacao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegistroAvaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_formato_avaliacao")
    private  FormatoAvaliacao formatoAvaliacao;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_avaliador")
    private Avaliador avaliador;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "id_equipe")
    private Equipe equipe;

    private Date dataAvaliacao;

}
