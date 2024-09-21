package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="anexo_prototipo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnexoPrototipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "prototipo_id")
    private Prototipo prototipo;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "equipe_id")
    private Equipe equipe;

    @ManyToOne
    @JoinColumn(name = "tipo_anexo_prototipo_id")
    private TipoAnexoPrototipo tipoAnexoPrototipo;

    private String nomeAnexo;
    private String caminhoAnexo;

}
