package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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

    private String linkPitch;

    @OneToOne
    @JoinColumn(name = "BANNER_ID", referencedColumnName = "id")
    private Banner banner;

    @JsonIgnore
    @OneToMany(mappedBy = "equipe")
    private List<Aluno> alunos;

}
