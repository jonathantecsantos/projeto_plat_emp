package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity(name="importacao")
@NoArgsConstructor
@AllArgsConstructor
public class Importacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeProcesso;

    private Date dataInicio;

    private Date dataFim;

    private Boolean processado;

    private String usuario;
}
