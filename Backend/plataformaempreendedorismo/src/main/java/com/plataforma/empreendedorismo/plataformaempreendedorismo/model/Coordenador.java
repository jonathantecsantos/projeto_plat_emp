package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import com.plataforma.empreendedorismo.plataformaempreendedorismo.record.coordenador.CoordenadorCadastroRecord;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="coordenador")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Coordenador {

    private static final long serialVersionUID = -4755373470269044120L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String cpf;

    private String email;

    @OneToOne(mappedBy = "coordenador")
    private Usuario usuario;

    public Coordenador(CoordenadorCadastroRecord coordenadorCadastroRecord) {
        this.nome = coordenadorCadastroRecord.nome();
        this.email = coordenadorCadastroRecord.email();
        this.cpf = coordenadorCadastroRecord.cpf();
    }
}
