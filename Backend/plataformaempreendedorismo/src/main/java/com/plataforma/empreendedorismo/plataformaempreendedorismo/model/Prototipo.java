package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity(name="prototipo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Prototipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "prototipo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AnexoPrototipo> anexos = new ArrayList<>();

    private String instituicaoImpactoSocial;

    private String problemaPrincipal;

    private String propostaValor;

    private String vantagemCompetitiva;

    private String principaisNecessidades;

    private String parcerias;

    private String tipoApoio;


}
