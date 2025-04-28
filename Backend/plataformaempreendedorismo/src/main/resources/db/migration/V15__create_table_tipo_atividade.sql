CREATE TABLE tipo_atividade (
                             id int NOT NULL AUTO_INCREMENT,
                             descricao varchar(500) DEFAULT NULL,
                             ativo tinyint(1) NOT NULL,
                             PRIMARY KEY (id)
);

INSERT INTO tipo_atividade (descricao, ativo) VALUES
                                                  ('Produtos inovadores em qualquer área do conhecimento', 1),
                                                  ('Serviços inovadores em qualquer área do conhecimento', 1),
                                                  ('Automação, robótica, aplicação de drones', 1),
                                                  ('Jogos educacionais analógicos e / ou digitais', 1),
                                                  ('Atividades para o desenvolvimento sustentável com tecnologias sociais', 1),
                                                  ('Atividades culturais inovadoras (peça teatral ou stand up; espetáculo de dança; banda ou grupo musical)', 1),
                                                  ('Plataformas; Blogs; Podcasts', 1),
                                                  ('Aplicativos para Smartphones; Tablets; TVs', 1),
                                                  ('Internet das Coisas (aplicações para Alexa / Google Home)', 1),
                                                  ('Inovações assistidas por Inteligência Artificial', 1),
                                                  ('Entre outras atividades (propostas / soluções) inovadoras', 1);

CREATE TABLE equipe_tipo_atividade (
                                       equipe_id INT NOT NULL,
                                       tipo_atividade_id INT NOT NULL,
                                       PRIMARY KEY (equipe_id, tipo_atividade_id),
                                       FOREIGN KEY (equipe_id) REFERENCES equipe(id),
                                       FOREIGN KEY (tipo_atividade_id) REFERENCES tipo_atividade(id)
);