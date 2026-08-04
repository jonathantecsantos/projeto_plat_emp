package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity(name="equipe")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Equipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private Integer ano;


    private String linkPitch;

    @Column(name = "logomarca_time")
    private String logomarcaTime;

    @Column(name = "nome_parceiro1")
    private String nomeParceiro1;

    @Column(name = "logomarca_parceiro1")
    private String logomarcaParceiro1;

    @Column(name = "nome_parceiro2")
    private String nomeParceiro2;

    @Column(name = "logomarca_parceiro2")
    private String logomarcaParceiro2;

    @OneToOne
    @JoinColumn(name = "BANNER_ID", referencedColumnName = "id")
    private Banner banner;

    @OneToOne
    @JoinColumn(name = "PROTOTIPO_ID", referencedColumnName = "id")
    private Prototipo prototipo;

    @ManyToMany
    @JoinTable(
            name = "equipe_ods",
            joinColumns = {@JoinColumn(name = "id_equipe", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "id_ods", referencedColumnName = "id")}
    )
    private List<Ods> odsList = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "equipe")
    private List<Aluno> alunos;

    @Transient
    private Boolean equipeAvaliada;

    @JsonIgnore
    @ManyToMany(mappedBy = "equipes")
    private List<Professor> professores = new ArrayList<>();

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "equipe_instituicao",
            joinColumns = @JoinColumn(name = "equipe_id"),
            inverseJoinColumns = @JoinColumn(name = "instituicao_id")
    )
    private List<Instituicao> instituicoes;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "equipe_tipo_atividade",
            joinColumns = @JoinColumn(name = "equipe_id"),
            inverseJoinColumns = @JoinColumn(name = "tipo_atividade_id")
    )
    private List<TipoAtividade> tipoAtividades;


}
