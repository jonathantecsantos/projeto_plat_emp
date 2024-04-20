package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity(name="grupo")
@NoArgsConstructor
@AllArgsConstructor
public class Grupo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @OneToMany(mappedBy = "grupo")
    private List<Aluno> alunos;
}
