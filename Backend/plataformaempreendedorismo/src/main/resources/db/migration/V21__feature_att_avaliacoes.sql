delete from registro_avaliacao;

drop table registro_avaliacao;

delete from avaliador_formato;

drop table avaliador_formato;

drop table avaliacao;

drop table subcriterio_avaliacao;

drop table criterio_avaliacao;

drop table formato_avaliacao;

CREATE TABLE formato_avaliacao (
                                   id int NOT NULL AUTO_INCREMENT,
                                   descricao varchar(255) DEFAULT NULL,
                                   nota_maxima_formato double DEFAULT NULL,
                                   PRIMARY KEY (id)
);

INSERT INTO db_empreendedorismo.formato_avaliacao (descricao,nota_maxima_formato) VALUES
                                                                                      ('PITCH',200.0),
                                                                                      ('CANVAS',200.0),
                                                                                      ('EXPO DLEI',300.0),
                                                                                      ('SHARK TANK',300.0);


CREATE TABLE criterio_avaliacao(
                                   id int NOT NULL AUTO_INCREMENT,
                                   descricao varchar(255) DEFAULT NULL,
                                   id_formato_avaliacao int DEFAULT NULL,
                                   nota_maxima_criterio double DEFAULT NULL,
                                   PRIMARY KEY (id),
                                   KEY tipo_avaliacao_fk1 (id_formato_avaliacao),
                                   CONSTRAINT tipo_avaliacao_fk1 FOREIGN KEY (id_formato_avaliacao) REFERENCES formato_avaliacao (id)
);

INSERT INTO db_empreendedorismo.criterio_avaliacao (descricao,id_formato_avaliacao,nota_maxima_criterio) VALUES
                                                                                                             ('Criatividade',1,50.0),
                                                                                                             ('Comunicação',1,50.0),
                                                                                                             ('Modelo de Negócio',1,100.0),
                                                                                                             ('Problema e Solução',2,40.0),
                                                                                                             ('Segmento de Clientes',2,30.0),
                                                                                                             ('Estrutura de Receita e Custo',2,30.0),
                                                                                                             ('Canais e Relacionamento',2,30.0),
                                                                                                             ('Parceirias e Recursos',2,30.0),
                                                                                                             ('Impacto',2,40.0),
                                                                                                             ('Viabilidade Técnica e Econômica',3,60.0);

INSERT INTO db_empreendedorismo.criterio_avaliacao (descricao,id_formato_avaliacao,nota_maxima_criterio) VALUES
                                                                                                             ('Qualidade e Funcionalidade',3,60.0),
                                                                                                             ('Inovação e Diferencial',3,60.0),
                                                                                                             ('Validação com Usuários',3,60.0),
                                                                                                             ('Apresentação Visual e Comunicação',3,60.0),
                                                                                                             ('Clareza do Problema e Solução',4,60.0),
                                                                                                             ('Potencial de Mercado',4,60.0),
                                                                                                             ('Modelo de Receita e Sustentabilidade Financeira',4,60.0),
                                                                                                             ('Impacto Socioambiental',4,60.0),
                                                                                                             ('Postura Empreendedora e Persuasão',4,60.0);

CREATE TABLE subcriterio_avaliacao (
                                       id int NOT NULL AUTO_INCREMENT,
                                       descricao varchar(500) NOT NULL,
                                       nota_maxima double DEFAULT NULL,
                                       id_criterio_avaliacao int DEFAULT NULL,
                                       valor_padrao tinyint(1) DEFAULT NULL,
                                       ordem_relatorio int NOT NULL,
                                       PRIMARY KEY (id),
                                       KEY criterio_fk1 (id_criterio_avaliacao),
                                       CONSTRAINT criterio_fk2 FOREIGN KEY (id_criterio_avaliacao) REFERENCES criterio_avaliacao (id)
);

INSERT INTO db_empreendedorismo.subcriterio_avaliacao (descricao,nota_maxima,id_criterio_avaliacao,valor_padrao,ordem_relatorio) VALUES
                                                                                                                                     ('Narrativa envolvente, uso criativo de recursos visuais e sonoros',50.0,1,NULL,0),
                                                                                                                                     ('Clareza, objetividade e assertividade na apresentação',50.0,2,NULL,1),
                                                                                                                                     ('Problema bem definido, solução inovadora, público-alvo claro, fontes de receita e impacto socioambiental',100.0,3,NULL,2),
                                                                                                                                     ('Clareza na dor do cliente e proposta de valor',40.0,4,NULL,3),
                                                                                                                                     ('Definição e compreensão do público-alvo',30.0,5,NULL,4),
                                                                                                                                     ('Fontes de receita, custos fixos e variáveis',30.0,6,NULL,5),
                                                                                                                                     ('Estratégias de comunicação e fidelização',30.0,7,NULL,6),
                                                                                                                                     ('Identificação de parceiros-chave e recursos essenciais',30.0,8,NULL,7),
                                                                                                                                     ('Benefícios sociais e ambientais do negócio',40.0,9,NULL,8);

INSERT INTO db_empreendedorismo.subcriterio_avaliacao (descricao,nota_maxima,id_criterio_avaliacao,valor_padrao,ordem_relatorio) VALUES
                                                                                                                                     ('O protótipo é exequível e tem potencial de mercado?',60.0,10,NULL,9),
                                                                                                                                     ('O protótipo demonstra claramente como o produto/serviço funciona?',60.0,11,NULL,10),
                                                                                                                                     ('O protótipo apresenta soluções originais em relação ao mercado?',60.0,12,NULL,11),
                                                                                                                                     ('Há evidências de testes reais e feedbacks do público-alvo?',60.0,13,NULL,12),
                                                                                                                                     ('Clareza na exposição, organização do espaço e engajamento com o público',60.0,14,NULL,13),
                                                                                                                                     ('O problema é relevante e a solução é bem estruturada?',60.0,15,NULL,14),
                                                                                                                                     ('O negócio tem público-alvo definido e potencial de crescimento?',60.0,16,NULL,15),
                                                                                                                                     ('Fontes de receita, estrutura de custos e viabilidade financeira',60.0,17,NULL,16),
                                                                                                                                     ('O negócio contribui para a redução de desigualdades e regeneração ambiental?',60.0,18,NULL,17),
                                                                                                                                     ('Segurança, domínio do conteúdo e capacidade de convencer investidores',60.0,19,NULL,18);


CREATE TABLE registro_avaliacao (
                                    id int NOT NULL AUTO_INCREMENT,
                                    id_formato_avaliacao int NOT NULL,
                                    id_avaliador int NOT NULL,
                                    id_equipe int NOT NULL,
                                    data_avaliacao datetime DEFAULT NULL,
                                    PRIMARY KEY (id),
                                    KEY id_formato_avaliacao_fk0 (id_formato_avaliacao),
                                    KEY id_avaliador_fk1 (id_avaliador),
                                    KEY id_equipe_fk2 (id_equipe),
                                    CONSTRAINT id_avaliador_fk1 FOREIGN KEY (id_avaliador) REFERENCES avaliador (id),
                                    CONSTRAINT id_equipe_fk2 FOREIGN KEY (id_equipe) REFERENCES equipe (id),
                                    CONSTRAINT id_formato_avaliacao_fk0 FOREIGN KEY (id_formato_avaliacao) REFERENCES formato_avaliacao (id)
);

CREATE TABLE avaliador_formato (
                                   id_avaliador int NOT NULL,
                                   id_formato_avaliacao int NOT NULL,
                                   PRIMARY KEY (id_avaliador, id_formato_avaliacao),
                                   KEY id_formato_avaliacao (id_formato_avaliacao),
                                   CONSTRAINT avaliador_formato_ibfk_1 FOREIGN KEY (id_avaliador) REFERENCES avaliador (id),
                                   CONSTRAINT avaliador_formato_ibfk_2 FOREIGN KEY (id_formato_avaliacao) REFERENCES formato_avaliacao (id)
);

CREATE TABLE avaliacao (
                           id int NOT NULL AUTO_INCREMENT,
                           id_equipe int NOT NULL,
                           id_criterio_avaliacao int NOT NULL,
                           id_subcriterio_avaliacao int NOT NULL,
                           id_avaliador int NOT NULL,
                           nota double DEFAULT NULL,
                           PRIMARY KEY (id),
                           KEY equipe_fk0 (id_equipe),
                           KEY criterio_avaliacao_fk1 (id_criterio_avaliacao),
                           KEY subcriterio_avaliacao_fk2 (id_subcriterio_avaliacao),
                           KEY avaliador_fk3 (id_avaliador),
                           CONSTRAINT avaliador_fk3 FOREIGN KEY (id_avaliador) REFERENCES avaliador (id),
                           CONSTRAINT criterio_avaliacao_fk1 FOREIGN KEY (id_criterio_avaliacao) REFERENCES criterio_avaliacao (id),
                           CONSTRAINT equipe_fk0 FOREIGN KEY (id_equipe) REFERENCES equipe (id),
                           CONSTRAINT subcriterio_avaliacao_fk2 FOREIGN KEY (id_subcriterio_avaliacao) REFERENCES subcriterio_avaliacao (id)
);