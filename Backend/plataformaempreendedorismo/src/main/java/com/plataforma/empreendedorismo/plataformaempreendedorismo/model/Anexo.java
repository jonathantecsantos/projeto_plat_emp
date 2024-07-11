package com.plataforma.empreendedorismo.plataformaempreendedorismo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name="anexo")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Anexo {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "banner_id")
        private Banner banner;

        private String nomeAnexo;
        private String caminhoAnexo;
}
