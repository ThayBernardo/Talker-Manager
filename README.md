<h1 align="center">Talker Manager</h1>
<p align="center">
  <a href="#O que foi desenvolvido">O que foi desenvolvido</a> •
  <a href="#Features">Features</a> 
</p>

# Sobre
Aplicação de cadastro de talkers (palestrantes) em que será possível cadastrar, visualizar, pesquisar, editar e excluir informações. 
- Node.js;
- Criar Middlewares;
- API CRUD (Create, Read, Update and Delete);
- Desenvolver endpoints que irão ler e escrever em um arquivo utilizando o módulo fs;
- Criar uma aplicação Express.js;
<br />

# O que foi desenvolvido
  Uma API `CRUD` (**C**reate, **R**ead, **U**pdate e **D**elete) de palestrantes (talkers);
  <br />
  Endpoints que irão ler e escrever em um arquivo utilizando o módulo `fs`.
<br />

# Features
  - [x] Todas pessoas palestrantes cadastradas.<br />
  - [x] Pessoa palestrante com base no id da rota.<br />
  - [x] Retorna um token aleatório de 16 caracteres.<br />
  - [x] Validação caso dados sejam inválidos.<br />
  - [x] Adicionar uma nova pessoa palestrante.<br />
  - [x] Editar uma pessoa palestrante com base no id da rota.<br />
  - [x] Autenticação nos headers, no campo authorization.<br />
  - [x] Retorna um array de palestrantes que contenham em seu nome o termo pesquisado no queryParam da URL.
<br />

# Rodando em Docker
<strong>É necessário que você tenha em sua máquina instalado `node` e `docker`</strong>

>Rode o serviço `node` com o comando:

```bash
docker-compose up -d
``` 

- Esse serviço irá inicializar um container chamado talker_manager.
- A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

>Use o comando:

```bash
docker exec -it talker_manager bash
```

- Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

>Instale as dependências com:

```bash
npm install
```

# Rodando localmente

>Instale as dependências com:

```bash
npm install
```