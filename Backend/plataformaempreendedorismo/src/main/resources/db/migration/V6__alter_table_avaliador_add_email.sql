drop table IF EXISTS usuario;

DROP TABLE IF EXISTS avaliador_formato;

drop table IF EXISTS avaliacao;

drop table IF EXISTS registro_avaliacao;

DROP TABLE IF EXISTS avaliador;

DROP TABLE IF EXISTS administrador;

drop table IF EXISTS coordenador;

CREATE TABLE administrador (
                               id INT AUTO_INCREMENT PRIMARY KEY,
                               nome VARCHAR(255),
                               email VARCHAR (100)
);

CREATE TABLE coordenador (
                             id INT AUTO_INCREMENT PRIMARY KEY,
                             nome VARCHAR(255),
                             email VARCHAR (100)
);

CREATE TABLE avaliador (
                           id INT AUTO_INCREMENT PRIMARY KEY,
                           nome VARCHAR(255),
                           email VARCHAR (100),
                           instituicao VARCHAR(255)
);

CREATE TABLE avaliador_formato (
                                   id_avaliador INT,
                                   id_formato_avaliacao INT,
                                   PRIMARY KEY (id_avaliador, id_formato_avaliacao),
                                   FOREIGN KEY (id_avaliador) REFERENCES avaliador(id),
                                   FOREIGN KEY (id_formato_avaliacao) REFERENCES formato_avaliacao(id)
);

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

create table usuario(
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        login varchar(100) not null,
                        senha varchar (250) not null,
                        role varchar(50) not null,
                        avaliador_id INT,
                        professor_id INT,
                        aluno_id INT,
                        coordenador_id INT,
                        administrador_id INT,
                        FOREIGN KEY (avaliador_id) REFERENCES avaliador(id),
                        FOREIGN KEY (professor_id) REFERENCES professor(id),
                        FOREIGN KEY (aluno_id) REFERENCES aluno(id),
                        FOREIGN KEY (coordenador_id) REFERENCES coordenador(id),
                        FOREIGN KEY (administrador_id) REFERENCES administrador(id)
);