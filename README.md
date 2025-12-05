# Sistema de Ordens de Serviço - API e PWA (Progressive Web APP) 

**Bem-vindo(a) aos meus repositórios apiOrdens de Serviço & frontOrdens de Serviço!** 

## Descrição do Sistema

- O **Sistema de Ordens de Serviço** consiste no desenvolvimento de uma Progressive Web App (PWA) utilizando React, que se comunica com uma API para acessar e manipular dados de um banco de dados.
    - API back-end **(apiordenservico)** foi feita em  ```javaScript``` e interage com um banco de dados `relacional ```postgreSQL```
    - API front-end **(frontordenservico)** foi feita em ```React``` e interage com a o back-end
- Disponível no serviço de nuvem: [link](https://frontordenservico.vercel.app/)

## Funcionalidades principais

- Cadastrar, listar, editar e remover: CLientes, Serviços e Pedidos(Ordens de serviço)
    - CRUD (Create, Read, Update e Delete)
- Telas divididas em: Home, Ordens e Sobre
- Validações simples e tratamento de erros 

## Tecnologias Utilizadas

- Frontend: React, JavaScript, CSS, HTML
- Backend: Node.js, Express, JavaScript
- Banco de Dados: PostgreSQL
- Hospedagem em Nuvem: Vercel e Render

##  Arquitetura da API back-end

```apiordenservico/
├─ controllers/      # Contém a lógica para processar requisições
├─ entities/         # Define os modelos das tabelas do banco
├─ routes/           # Define as rotas da API
├─ usecases/         # Regras de negócio ou casos de uso
├─ config.js         # Configurações gerais da aplicação
├─ index.js          # Arquivo principal para iniciar o servidor
├─ package-lock.json # Gerado automaticamente pelo npm
└─ package.json      # Lista de dependências e scripts do projeto
```

### Depêndencias

- Configure o arquivo ```config.js``` para o banco
- Configure as portas de acesso local
- Instale no terminal do projeto ```npm install```
- Execute a aplicação no terminal do projeto ```npm start``` ou  ```npm run start:dev```

##  Arquitetura da API front-end

```src/
├─ componentes/
│  ├─ comuns/
│  └─ telas/
│     ├─ clientes/
│     ├─ pedidos/
│     ├─ servicos/
│     ├─ Home.jsx
│     ├─ Sobre.jsx
│     ├─ Menu.css
│     └─ Menu.jsx
├─ servicos/
├─ App.css
└─ App.jsx
```

### Depêndencias

- Configure as portas de acesso local
- Instale no terminal do projeto 
    - ```npm install```
    - ```yarn install```
    - ```yarn create react-app NOMEAQUI --template cra-template-pwa```
    - ```yarn add bootstrap bootstrap-icons react-bootstrap react-router-dom```
- Execute a aplicação no terminal do projeto ```yarn start```

## Banco de dados 

### Criar tabelas: 

```sql
CREATE TABLE clientes ( codigo SERIAL PRIMARY KEY, nome VARCHAR(100) NOT NULL, email VARCHAR(100), telefone VARCHAR(20) );

CREATE TABLE servicos ( codigo SERIAL PRIMARY KEY, nome VARCHAR(100) NOT NULL, preco DECIMAL(10, 2) NOT NULL, descricao TEXT );

CREATE TABLE pedidos ( codigo SERIAL PRIMARY KEY, data DATE NOT NULL, codigo_cliente INT NOT NULL, codigo_servico INT NOT NULL, FOREIGN KEY (codigo_cliente) REFERENCES clientes(codigo), FOREIGN KEY (codigo_servico) REFERENCES servicos(codigo) );

CREATE TABLE usuarios (codigo SERIAL PRIMARY KEY, nome VARCHAR(100) NOT NULL, username VARCHAR(50) UNIQUE NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, senha VARCHAR(255) NOT NULL, tipo VARCHAR(20));
```

### Inserir dados nas tabelas: 

```sql
INSERT INTO clientes (nome, email, telefone) VALUES ('Maria Silva', 'maria.silva@email.com', '1199999-1111'), ('João Pereira', 'joao.pereira@email.com', '1198888-2222'), ('Ana Souza', 'ana.souza@email.com', '1197777-3333');

INSERT INTO servicos (nome, preco, descricao)VALUES('Conserto de PC', 150.00, 'Formatação completa, limpeza interna e reinstalação do sistema operacional.'),('Backup de Dados', 80.00, 'Cópia de segurança de arquivos e configuração de armazenamento externo ou em nuvem.'),('Troca de Bateria', 120.00, 'Substituição de bateria de notebook ou celular, com teste de desempenho.'),('Instalação de Software', 60.00, 'Instalação e configuração de programas solicitados pelo cliente.'),('Remoção de Vírus', 90.00, 'Verificação completa e remoção de malwares e programas indesejados.'),('Limpeza Interna', 70.00, 'Limpeza física de componentes internos e otimização de desempenho.'); 

INSERT INTO pedidos (data, codigo_cliente, codigo_servico)VALUES('2025-10-20', 1, 1),('2025-10-21', 2, 2),('2025-10-22', 3, 3),('2025-10-23', 1, 5),('2025-10-23', 2, 4);

INSERT INTO usuarios (nome, username, email, senha, tipo) VALUES 
('Administrador', 'admin', 'admin@admin.com', 'XXX', 'admin'), ('Usuario Comum', 'user', 'user@user.com', '123456');
```

### Selecionar tabelas: 

```sql
SELECT * FROM clientes; 
SELECT * FROM servicos; 
SELECT * FROM pedidos;
```

### Apagar tabelas: 

```sql
DROP TABLE servicos; 
DROP TABLE pedidos; 
DROP TABLE clientes; 
```

> Instituto Federal Sul-rio-grandense - PF/RS   
> Disciplina: Programação Web 2025/2 | Aluna: Helen Zanco Neis

