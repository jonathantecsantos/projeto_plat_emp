package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.aluno.AlunoCadastroRecord;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="aluno")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Aluno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cpf;

    private String nome;

    private String email;

    private String turma;

    private Boolean isLider;

    private Boolean isViceLider;

    @OneToOne(mappedBy = "aluno")
    private Usuario usuario;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "equipe_id")
    private Equipe equipe;

    public Aluno(AlunoCadastroRecord alunoCadastroRecord, Equipe equipe) {
        this.cpf = alunoCadastroRecord.cpf();
        this.nome = alunoCadastroRecord.nome().toUpperCase();
        this.email = alunoCadastroRecord.email();
        this.turma = alunoCadastroRecord.turma().toUpperCase();
        this.isLider = alunoCadastroRecord.isLider();
        this.isViceLider = alunoCadastroRecord.isViceLider();
        this.equipe = equipe;
    }

}
