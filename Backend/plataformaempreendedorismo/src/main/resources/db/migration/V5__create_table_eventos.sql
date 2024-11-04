create table tipo_evento(
                            id INT AUTO_INCREMENT PRIMARY KEY,
                            descricao varchar (200)
);

insert into tipo_evento (descricao) values('INSCRIÇÃO'),('PROTOTIPO'),('BANNER'),('PITCH');

create table evento(
                       id INT AUTO_INCREMENT PRIMARY KEY,
                       data_inicio DATETIME null,
                       data_fim DATETIME null,
                       tipo_evento_id INT not null,
                       FOREIGN KEY (tipo_evento_id) REFERENCES tipo_evento (id)
);