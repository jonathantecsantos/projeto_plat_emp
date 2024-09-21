package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="tipo_anexo_prototipo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TipoAnexoPrototipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String descricao;
}
