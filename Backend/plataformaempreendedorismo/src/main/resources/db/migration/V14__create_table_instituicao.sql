CREATE TABLE instituicao (
                             id int NOT NULL AUTO_INCREMENT,
                             descricao varchar(500) DEFAULT NULL,
                             ativo tinyint(1) NOT NULL,
                             PRIMARY KEY (id)
);


INSERT INTO instituicao (descricao, ativo) VALUES
                                               ('Lar da Sagrada Face', 1),
                                               ('São Vicente de Paulo', 1),
                                               ('Casa da Criança Drº João Moura', 1),
                                               ('Casa do Menino', 1),
                                               ('Casa de Acolhida Pe. Ibiapina', 1),
                                               ('Casa de Acolhida Rosa Mística', 1),
                                               ('Casa de Acolhida Nossa Senhora de Lourdes – (Essa está em construção) – Próximo à FAP.', 1),
                                               ('Casa de Acolhida Santa Isabel de Hungria', 1),
                                               ('Fazenda do Sol', 1),
                                               ('Homens de Cristo – Casa Evangélica em São Sebastião de Lagoa de Roça (Pastor Francisco)', 1),
                                               ('Santuário da Divina Misericórdia', 1),
                                               ('Casa de Acolhida São Paulo da Cruz', 1),
                                               ('Fraternidade Irmãos de Francisco', 1),
                                               ('Pastoral de Acesso à Justiça e Direitos Humanos', 1),
                                               ('Pastoral da Criança', 1),
                                               ('Pastoral da Pessoa Idosa', 1),
                                               ('Pastoral da Saúde', 1),
                                               ('Pastoral da Mulher', 1),
                                               ('Pastoral da Sobriedade', 1),
                                               ('Pastoral das Necessidades Especiais (Surdos, cegos, cadeirantes, etc)', 1),
                                               ('Pastoral Carcerária', 1),
                                               ('Pastoral Operária', 1),
                                               ('Pastoral de Pessoas em situação de Rua', 1),
                                               ('Comissão Pastoral da Terra – CPT', 1),
                                               ('ORGANIZAÇÕES SOCIAIS', 1),
                                               ('Abrigo de Animais Arca do Tota', 1),
                                               ('Abrigo de Animais A4', 1),
                                               ('APAE', 1),
                                               ('Casa da Lili', 1),
                                               ('Cata Mais', 1),
                                               ('COTRAMARE', 1),
                                               ('Centelhas de Cristo', 1),
                                               ('CENTRAC - Centro de Arte e Cultura', 1),
                                               ('Hospital da FAP', 1),
                                               ('Instituto dos Cegos', 1),
                                               ('Movimento dos Atingidos pela Barragem de Acauã (MAB Acauã)', 1),
                                               ('Répteis da Caatinga', 1);

CREATE TABLE equipe_instituicao (
                                    equipe_id int NOT NULL,
                                    instituicao_id INT NOT NULL,
                                    PRIMARY KEY (equipe_id, instituicao_id),
                                    FOREIGN KEY (equipe_id) REFERENCES equipe(id),
                                    FOREIGN KEY (instituicao_id) REFERENCES instituicao(id)
);