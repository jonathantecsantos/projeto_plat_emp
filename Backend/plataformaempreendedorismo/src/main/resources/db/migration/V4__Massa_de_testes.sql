create table usuario(
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        login varchar(100) not null,
                        senha varchar (250) not null,
                        role varchar(50) not null
);