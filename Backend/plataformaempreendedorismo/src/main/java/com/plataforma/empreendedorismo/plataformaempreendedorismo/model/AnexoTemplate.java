package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import util.enuns.TipoTemplate;

@Entity(name = "anexo_template")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnexoTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_anexo")
    private String nomeAnexo;

    @Column(name = "caminho_anexo")
    private String caminhoAnexo;

    @Column(name = "ano_letivo")
    private Integer anoLetivo;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_template", nullable = false)
    private TipoTemplate tipoTemplate;
}
