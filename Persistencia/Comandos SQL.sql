create database atividadefinal

use atividadefinal

CREATE TABLE candidatos (
    pk_cand_cpf VARCHAR(11) PRIMARY KEY,
    cand_nome VARCHAR(255) NOT NULL,
    cand_endereco VARCHAR(255) NOT NULL,
    cand_telefone VARCHAR(20) NOT NULL
);
CREATE TABLE vagas (
    pk_vaga_codigo INT PRIMARY KEY AUTO_INCREMENT,
    vaga_cargo VARCHAR(255) NOT NULL,
    vaga_salario DECIMAL(10,2) NOT NULL,
    vaga_cidade VARCHAR(255) NOT NULL,
    vaga_quantidade INT NOT NULL
);
CREATE TABLE inscricoes (
    pk_inscricao_id INT PRIMARY KEY AUTO_INCREMENT,
    pk_cand_cpf VARCHAR(11) NOT NULL,
    pk_vaga_codigo INT NOT NULL,
    data_inscricao DATE NOT NULL,
    horario_inscricao TIME NOT NULL,
    FOREIGN KEY (pk_cand_cpf) REFERENCES candidatos(pk_cand_cpf),
    FOREIGN KEY (pk_vaga_codigo) REFERENCES vagas(pk_vaga_codigo)
);
