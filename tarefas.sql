CREATE DATABASE produtos;

USE produtos;

CREATE TABLE produtos (
  id INT AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  preco DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (id)
);