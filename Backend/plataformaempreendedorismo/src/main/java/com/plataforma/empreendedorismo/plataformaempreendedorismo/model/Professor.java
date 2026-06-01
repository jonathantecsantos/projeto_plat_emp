package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor.ProfessorCadastroRecord;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity(name="professor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Professor {

    private static final long serialVersionUID = 465216990111003501L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String cpf;

    private String email;

    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "professor_equipe",
            joinColumns = @JoinColumn(name = "id_professor"),
            inverseJoinColumns = @JoinColumn(name = "id_equipe")
    )
    private List<Equipe> equipes = new ArrayList<>();

    @JsonIgnore
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "professor")
    private Usuario usuario;

    private Date dataNascimento;

    private String tamanhoCamisa;

    private Boolean habilitado = true;

    public Professor(ProfessorCadastroRecord professorCadastroRecord, List<Equipe> equipes) {
        this.nome = professorCadastroRecord.nome().toUpperCase();
        this.cpf = professorCadastroRecord.cpf();
        this.email = professorCadastroRecord.email();
        this.dataNascimento = professorCadastroRecord.dataNascimento();
        this.tamanhoCamisa = professorCadastroRecord.tamanhoCamisa();
        this.equipes = equipes;
        this.habilitado = professorCadastroRecord.habilitado() != null ? professorCadastroRecord.habilitado() : true;
    }
}
