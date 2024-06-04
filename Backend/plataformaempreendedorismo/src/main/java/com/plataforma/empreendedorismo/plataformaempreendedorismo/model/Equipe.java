package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

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

    @OneToMany(mappedBy = "equipe")
    private List<Aluno> alunos;
}
