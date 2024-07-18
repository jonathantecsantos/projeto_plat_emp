package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.professor.ProfessorCadastroRecord;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="professor")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Professor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String cpf;

    private String email;

    @OneToOne
    private Equipe equipe;

    public Professor(ProfessorCadastroRecord professorCadastroRecord, Equipe equipe) {
        this.nome = professorCadastroRecord.nome().toUpperCase();
        this.cpf = professorCadastroRecord.cpf();
        this.email = professorCadastroRecord.email();
        this.equipe = equipe;
    }
}
