CREATE TABLE db_empreendedorismo.importacao (
                                                id INT PRIMARY KEY AUTO_INCREMENT,
                                                nome_processo VARCHAR(50) NOT NULL,
                                                data_inicio DATETIME,
                                                data_fim DATETIME,
                                                processado TINYINT(1),
                                                usuario VARCHAR(50)
);

CREATE TABLE banner (
                        ID INT PRIMARY key AUTO_INCREMENT,
                        TEXTO_DESCRICAO_Q0 VARCHAR(500),
                        EQUIPE_Q1 VARCHAR(500),
                        PARCEIRO_Q1 VARCHAR(500),
                        ATIVIDADE_CHAVE_Q1 VARCHAR(500),
                        RECURSOS_Q1 VARCHAR(500),
                        CUSTOS_Q1 VARCHAR(500),
                        OPORTUNIDADE_NEG_Q2 VARCHAR(500),
                        CUSTO_Q2 VARCHAR(500),
                        PROPOSTA_VALOR_Q2 VARCHAR(500),
                        FONTE_RECEITA_Q2 VARCHAR(500),
                        RESULTADO_FINANCEIRO_Q2 VARCHAR(500),
                        CONTEXTO_PROBLEMA_Q3 VARCHAR(500),
                        PUBLICO_FOCO_IMPACTO_Q3 VARCHAR(500),
                        INTERVENCOES_Q3 VARCHAR(500),
                        SAIDAS_Q3 VARCHAR(500),
                        RESULTADOS_CURTO_PRAZO_Q3 VARCHAR(500),
                        RESULTADOS_MEDIO_PRAZO_Q3 VARCHAR(500),
                        VISAO_IMPACTO_Q3 VARCHAR(500)
);


CREATE TABLE ods (
                     id INT PRIMARY KEY AUTO_INCREMENT,
                     codigo VARCHAR(10) NOT NULL,
                     descricao VARCHAR(250)
);

CREATE TABLE prototipo (
                           id int NOT NULL AUTO_INCREMENT,
                           instituicao_impacto_social varchar(500) DEFAULT null,
                           problema_principal varchar(500) DEFAULT null,
                           proposta_valor varchar(500) DEFAULT null,
                           vantagem_competitiva varchar(500) DEFAULT null,
                           principais_necessidades varchar(500) default null,
                           parcerias varchar(500) DEFAULT null,
                           tipo_apoio varchar(500) DEFAULT null,
                           PRIMARY KEY (id)
);

CREATE TABLE equipe (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        nome VARCHAR(100) NOT null,
                        banner_id INT null,
                        prototipo_id INT null,
                        link_pitch VARCHAR(250) null,
                        FOREIGN KEY (banner_id) REFERENCES banner(ID),
                        FOREIGN KEY (prototipo_id) REFERENCES prototipo(ID)
);

CREATE TABLE aluno (
                       id INT PRIMARY KEY AUTO_INCREMENT,
                       cpf VARCHAR(11) NOT NULL,
                       nome VARCHAR(100) NOT NULL,
                       email VARCHAR(100) NOT NULL,
                       turma VARCHAR(2) NOT NULL,
                       is_lider TINYINT(1) NOT NULL,
                       is_vice_lider TINYINT(1) NOT NULL,
                       equipe_id INT,
                       FOREIGN KEY (equipe_id) REFERENCES equipe(id)
);

INSERT INTO ods (codigo, descricao) VALUES
                                        ('ODS1', 'Erradicação da Pobreza'),
                                        ('ODS2', 'Fome Zero e Agricultura Sustentável'),
                                        ('ODS3', 'Saúde e Bem-Estar'),
                                        ('ODS4', 'Educação de Qualidade'),
                                        ('ODS5', 'Igualdade de Gênero'),
                                        ('ODS6', 'Água Potável e Saneamento'),
                                        ('ODS7', 'Energia Acessível e Limpa'),
                                        ('ODS8', 'Trabalho Decente e Crescimento Econômico'),
                                        ('ODS9', 'Indústria, Inovação e Infraestrutura'),
                                        ('ODS10', 'Redução das Desigualdades'),
                                        ('ODS11', 'Cidades e Comunidades Sustentáveis'),
                                        ('ODS12', 'Consumo e Produção Responsáveis'),
                                        ('ODS13', 'Ação Contra a Mudança Global do Clima'),
                                        ('ODS14', 'Vida na Água'),
                                        ('ODS15', 'Vida Terrestre'),
                                        ('ODS16', 'Paz, Justiça e Instituições Eficazes'),
                                        ('ODS17', 'Parcerias e Meios de Implementação');

CREATE TABLE avaliador (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           nome VARCHAR(255),
                           instituicao VARCHAR(255)
);

CREATE TABLE formato_avaliacao (
                                   id int NOT NULL AUTO_INCREMENT,
                                   descricao varchar(255) DEFAULT NULL,
                                   nota_maxima_formato double DEFAULT NULL,
                                   PRIMARY KEY (id)
);

INSERT INTO formato_avaliacao (descricao,nota_maxima_formato) VALUES
                                                                                      ('DLJ',100.0),
                                                                                      ('PITCH',200.0),
                                                                                      ('SHARK TANK',400.0),
                                                                                      ('EXPO DLEI',400.0);

CREATE TABLE avaliador_formato (
                                   id_avaliador INT,
                                   id_formato_avaliacao INT,
                                   PRIMARY KEY (id_avaliador, id_formato_avaliacao),
                                   FOREIGN KEY (id_avaliador) REFERENCES avaliador(id),
                                   FOREIGN KEY (id_formato_avaliacao) REFERENCES formato_avaliacao(id)
);


CREATE TABLE professor (
                           id INT PRIMARY KEY AUTO_INCREMENT,
                           nome varchar(100) NOT NULL,
                           cpf VARCHAR(11) NOT NULL,
                           email varchar(100) NOT NULL,
                           equipe_id INT,
                           FOREIGN KEY (equipe_id) REFERENCES equipe(id)
);

CREATE TABLE anexo_banner (
                              id INT AUTO_INCREMENT PRIMARY KEY,
                              banner_id INT,
                              nome_anexo VARCHAR(255),
                              caminho_anexo VARCHAR(500),
                              FOREIGN KEY (banner_id) REFERENCES banner (id)
);

CREATE TABLE equipe_ods (
                            id_equipe int NOT NULL,
                            id_ods int NOT NULL,
                            PRIMARY KEY (id_equipe,id_ods),
                            KEY id_ods (id_ods),
                            CONSTRAINT equipe_fk1 FOREIGN KEY (id_equipe) REFERENCES equipe (id),
                            CONSTRAINT ods_fk2 FOREIGN KEY (id_ods) REFERENCES ods (id)
);

CREATE TABLE criterio_avaliacao (
                                    id int NOT NULL AUTO_INCREMENT,
                                    descricao varchar(255) DEFAULT NULL,
                                    id_formato_avaliacao int DEFAULT NULL,
                                    nota_maxima_criterio double DEFAULT NULL,
                                    KEY tipo_avaliacao_fk1 (id_formato_avaliacao),
                                    PRIMARY KEY (id),
                                    CONSTRAINT tipo_avaliacao_fk1 FOREIGN KEY (id_formato_avaliacao) REFERENCES formato_avaliacao (id)
);

CREATE TABLE subcriterio_avaliacao (
                                       id int NOT NULL AUTO_INCREMENT,
                                       descricao varchar(500) NOT NULL,
                                       nota_maxima double DEFAULT NULL,
                                       id_criterio_avaliacao int DEFAULT NULL,
                                       valor_padrao tinyint(1) DEFAULT NULL,
                                       PRIMARY KEY (id),
                                       KEY criterio_fk1 (id_criterio_avaliacao),
                                       CONSTRAINT criterio_fk2 FOREIGN KEY (id_criterio_avaliacao) REFERENCES criterio_avaliacao (id)
);

INSERT INTO criterio_avaliacao (descricao,id_formato_avaliacao,nota_maxima_criterio) VALUES
                                                                                                             ('DLJ',1,100.0),
                                                                                                             ('Criatividade',2,50.0),
                                                                                                             ('Comunicação',2,50.0),
                                                                                                             ('Modelo de Negócio no Pitch',2,100.0),
                                                                                                             ('Problema/Inovação',3,100.0),
                                                                                                             ('Mercado',3,100.0),
                                                                                                             ('Impacto Social e Ambiental',3,200.0),
                                                                                                             ('Modelo de negócio',4,100.0),
                                                                                                             ('Estágio atual da Solução/Protótipo',4,200.0),
                                                                                                             ('Validação',4,100.0);

INSERT INTO subcriterio_avaliacao (descricao,nota_maxima,id_criterio_avaliacao,valor_padrao) VALUES
                                                                                                                     ('O time fez inscrição no DLJ SEBRAE 2024 com a ideia / proposta do DLEI 2024, sendo Líder + 04 Integrantes?',25.0,1,1),
                                                                                                                     ('O time fez inscrição no DLJ SEBRAE 2023 com a ideia / proposta do DLEI 2024, sendo Líder + 04 Integrantes?',25.0,1,0),
                                                                                                                     ('A classificação do Time do DLEI 2024 está entre os 24 melhores Times do Estado da Paraíba no DLJ SEBRAE 2024?',25.0,1,0),
                                                                                                                     ('O Time do DLEI 2024 foi classificado da Etapa Estadual para a Regional do DLJ SEBRAE 2024?',50.0,1,0),
                                                                                                                     ('O pitch de vídeo apresenta com clareza o problema/solução/protótipo de forma criativa?',50.0,2,NULL),
                                                                                                                     ('A comunicação do negócio no pitch de vídeo foi clara e assertiva?',50.0,3,NULL),
                                                                                                                     ('O problema identificado foi relevante e está bem definido no pitch de vídeo?',20.0,4,NULL),
                                                                                                                     ('A solução encontrada para atacar ou resolver o problema está bem posta no pitch de vídeo?',20.0,4,NULL),
                                                                                                                     ('Os clientes da solução estão bem identificados e foram exemplificados no pitch de vídeo?',20.0,4,NULL),
                                                                                                                     ('As fontes de receita levantadas estão bem demostradas no pitch de vídeo?',20.0,4,NULL);

INSERT INTO subcriterio_avaliacao (descricao,nota_maxima,id_criterio_avaliacao,valor_padrao) VALUES
                                                                                                                     ('Os impactos socioambientais positivos estão bem explicitados no pitch de vídeo?',20.0,4,NULL),
                                                                                                                     ('O produto/serviço do negócio ataca um problema relevante?',50.0,5,NULL),
                                                                                                                     ('Representa uma inovação promissora em relação aos concorrentes?',50.0,5,NULL),
                                                                                                                     ('O segmento de mercado e a clientela alvo estão bem definidos?',30.0,6,NULL),
                                                                                                                     ('O produto/serviço do negócio é promissor para esse mercado?',30.0,6,NULL),
                                                                                                                     ('O produto/serviço do negócio já está gerando receitas com vendas?',40.0,6,NULL),
                                                                                                                     ('O negócio causa impactos sociais positivos com vistas às desigualdades sociais?',100.0,7,NULL),
                                                                                                                     ('O negócio traz impactos positivos e benéficios para o meio ambiente e os ecossistemas?',100.0,7,NULL),
                                                                                                                     ('O modelo de negócio é viável?',25.0,8,NULL),
                                                                                                                     ('O modelo de negócio é inovador?',25.0,8,NULL);

INSERT INTO subcriterio_avaliacao (descricao,nota_maxima,id_criterio_avaliacao,valor_padrao) VALUES
                                                                                                                     ('O modelo de negócio é escalável?',25.0,8,NULL),
                                                                                                                     ('As estruturas de custos e de receitas estão bem definidas no modelo de negócio?',25.0,8,NULL),
                                                                                                                     ('O produto/serviço tem viabilidade técnica e econômica? É exequível?',50.0,9,NULL),
                                                                                                                     ('A versão atual do protótipo desenvolvido já está próxima de um produto/serviço vendável?',50.0,9,NULL),
                                                                                                                     ('A versão atual já consegue demonstrar o potencial do negócio?',50.0,9,NULL),
                                                                                                                     ('A qualidade do protótipo consegue mostrar as funcionalidades reais do produto/serviço?',50.0,9,NULL),
                                                                                                                     ('Os indícios de validação que foram apresentados demonstram que o produto/serviço é promissor?',50.0,10,NULL),
                                                                                                                     ('O número de pessoas que já validou a versão atual do produto foi suficiente?',50.0,10,NULL);

CREATE TABLE avaliacao (
                           id int NOT NULL AUTO_INCREMENT,
                           id_equipe int NOT NULL,
                           id_criterio_avaliacao int NOT NULL,
                           id_subcriterio_avaliacao int NOT NULL,
                           id_avaliador int not null,
                           nota double DEFAULT NULL,
                           PRIMARY KEY (id),
                           CONSTRAINT equipe_fk0 FOREIGN KEY (id_equipe) REFERENCES equipe (id),
                           CONSTRAINT criterio_avaliacao_fk1 FOREIGN KEY (id_criterio_avaliacao) REFERENCES criterio_avaliacao (id),
                           CONSTRAINT subcriterio_avaliacao_fk2 FOREIGN KEY (id_subcriterio_avaliacao) REFERENCES subcriterio_avaliacao (id),
                           CONSTRAINT avaliador_fk3 FOREIGN KEY (id_avaliador) REFERENCES avaliador (id)
);

CREATE TABLE registro_avaliacao (
                                    id int NOT NULL AUTO_INCREMENT,
                                    id_formato_avaliacao int NOT NULL,
                                    id_avaliador int NOT NULL,
                                    id_equipe int NOT NULL,
                                    data_avaliacao datetime DEFAULT NULL,
                                    PRIMARY KEY (id),
                                    CONSTRAINT id_formato_avaliacao_fk0 FOREIGN KEY (id_formato_avaliacao) REFERENCES formato_avaliacao (id),
                                    CONSTRAINT id_avaliador_fk1 FOREIGN KEY (id_avaliador) REFERENCES avaliador (id),
                                    CONSTRAINT id_equipe_fk2 FOREIGN KEY (id_equipe) REFERENCES equipe (id)
);

CREATE TABLE tipo_anexo_prototipo (
                                      id int NOT NULL AUTO_INCREMENT,
                                      descricao varchar(255) DEFAULT null,
                                      PRIMARY KEY (id)
);

insert into tipo_anexo_prototipo (descricao) values
                                                 ('CRONOGRAMA_CONSTRUCAO'),
                                                 ('ANEXO'),
                                                 ('MEMORIAL_DESCRITIVO'),
                                                 ('ESQUEMA');

CREATE TABLE anexo_prototipo (
                                 id INT AUTO_INCREMENT PRIMARY KEY,
                                 prototipo_id INT,
                                 equipe_id INT,
                                 tipo_anexo_prototipo_id INT,
                                 nome_anexo VARCHAR(255),
                                 caminho_anexo VARCHAR(500),
                                 FOREIGN KEY (prototipo_id) REFERENCES prototipo (id),
                                 FOREIGN KEY (tipo_anexo_prototipo_id) REFERENCES tipo_anexo_prototipo (id),
                                 FOREIGN KEY (equipe_id) REFERENCES equipe (id)
);

