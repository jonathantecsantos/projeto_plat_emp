DELETE FROM equipe_tipo_atividade;

DELETE FROM tipo_atividade;

INSERT INTO tipo_atividade (descricao, ativo) VALUES
    ('Aplicativos para Smartphones; Tablets; TVs', 1),
    ('Atividades culturais inovadoras (peça teatral ou stand up; espetáculo de dança; banda ou grupo musical)', 1),
    ('Atividades para o desenvolvimento sustentável com tecnologias sociais', 1),
    ('Automação, robótica, aplicação de drones', 1),
    ('Internet das Coisas (aplicações para Alexa / Google Home)', 1),
    ('Inovações assistidas por Inteligência Artificial', 1),
    ('Jogos educacionais analógicos e / ou digitais', 1),
    ('Plataformas; Blogs; Podcasts', 1),
    ('Produtos inovadores em qualquer área do conhecimento', 1),
    ('Serviços inovadores em qualquer área do conhecimento', 1),
    ('Outras atividades (propostas / soluções) inovadoras', 1);