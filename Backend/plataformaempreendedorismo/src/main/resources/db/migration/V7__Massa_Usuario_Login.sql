insert into ADMINISTRADOR (nome,email) values ('admin','admin@gmail.com');

INSERT INTO db_empreendedorismo.usuario
(login, senha, `role`,administrador_id)
VALUES('admin@gmail.com', '$2a$10$VxJ5GZlpqdbanDzgWHdnr.OTiZFomFbK2JjhF2HMzPTFjgSkKd8HW', 'ROLE_ADMIN',
       (select id from administrador where email = 'admin@gmail.com'));

insert into AVALIADOR (nome,email) values ('avaliador','avaliador@gmail.com');

INSERT INTO db_empreendedorismo.usuario
(login, senha, `role`, avaliador_id)
VALUES('avaliador@gmail.com', '$2a$10$VxJ5GZlpqdbanDzgWHdnr.OTiZFomFbK2JjhF2HMzPTFjgSkKd8HW', 'ROLE_AVALIADOR',
       (select id from avaliador where email = 'avaliador@gmail.com'));

insert into COORDENADOR (nome,email) values ('coordenador','coordenador@gmail.com');
INSERT INTO db_empreendedorismo.usuario
(login, senha, `role`, coordenador_id)
VALUES('coordenador@gmail.com', '$2a$10$VxJ5GZlpqdbanDzgWHdnr.OTiZFomFbK2JjhF2HMzPTFjgSkKd8HW', 'ROLE_COORDENADOR',
       (select id from coordenador where email = 'coordenador@gmail.com'));

INSERT INTO db_empreendedorismo.usuario
(login, senha, `role`, aluno_id)
VALUES('rodolfo@gmail.com', '$2a$10$VxJ5GZlpqdbanDzgWHdnr.OTiZFomFbK2JjhF2HMzPTFjgSkKd8HW', 'ROLE_ALUNO',
       (select id from aluno where email = 'rodolfo@gmail.com'));

INSERT INTO db_empreendedorismo.usuario
(login, senha, `role`, professor_id)
VALUES('jose.lopes@gmail.com', '$2a$10$VxJ5GZlpqdbanDzgWHdnr.OTiZFomFbK2JjhF2HMzPTFjgSkKd8HW', 'ROLE_PROFESSOR',
       (select id from professor where email = 'jose.lopes@gmail.com'));