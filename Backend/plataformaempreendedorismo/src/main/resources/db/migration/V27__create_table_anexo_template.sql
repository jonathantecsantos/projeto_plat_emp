CREATE TABLE anexo_template (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_anexo VARCHAR(255) DEFAULT NULL,
    caminho_anexo VARCHAR(500) DEFAULT NULL,
    ano_letivo INT DEFAULT NULL,
    tipo_template VARCHAR(50) NOT NULL
);
