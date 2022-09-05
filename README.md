# Validação JWT
![GitHub repo size](https://img.shields.io/github/repo-size/DaniloCalegaro/validation-jwt-nextjs)

### Tabela de conteúdos

- [Validação JWT](#validação-jwt)
    - [Tabela de conteúdos](#tabela-de-conteúdos)
  - [Visão Geral](#visão-geral)
    - [A Página](#a-página)
    - [Recursos utilizados](#recursos-utilizados)
  - [Pré-requisitos](#pré-requisitos)
  - [Autor](#autor)

## Visão Geral
### A Página
Aplicação básica construída para fiz de estudos do processo de autenticação JWT em ReactJS. Nela contém apenas dois `inputs` sendo login e senha respectivamente e um `button` para submit de login.

Os conceitos estudados foram sobre autenticação pelo lado do cliente no conceito SPA e também para o lado do servidor SSR NextJS. Também foi abordado a utilização dos `cookies` para armazenagem dos tokens da aplicação.

### Recursos utilizados

- [yarn](https://yarnpkg.com/) - Gerenciador de pacotes do projeto.
- [NextJS](https://nextjs.org/) - Framework React.
- [TypeScrip](https://www.typescriptlang.org/) - Uma linguagem de programação fortemente tipada que se baseia em JavaScript.
- [Nookies](https://github.com/maticzav/nookies) - Uma coleção de auxiliares de cookies para Next.js.

## Pré-requisitos


Para executar o projeto *local* utilizamos os comandos após realizar o download ou clone do repositório:

Instalar a dependencias do projeto:

> yarn install

Logo em seguida:

> yarn run dev

A aplicação funciona com um servidor back-end muito simples para validações de usuários e para isso precisamos instalar suas dependências. Então executamos esta sequência de comando para colocar em atividade.

> cd ignite-reactjs-auth-backend

> yarn install

> yarn run dev

E a aplicação estará pronta para ser visualizada no endereço [http://localhost:3000](http://localhost:3000).

Os usuários validos são:
````
login: danilo@teste.team
senha: 123456
````

````
login: estagiario@teste.team
senha: 123456
````
Cada um com suas respectivas `permissions` e `roles` definidas dentro do arquivo `database.ts` na pasta `ignite-reactjs-auth-backend`

O projeto esta dividido em três branchs: 

main: validações básicas.

feature-development-jwt-spa: validação do lado cliente SPA.

feature-development-jwt-ssr: validação do lado servidor Nextjs

## Autor

Portfólio - [danilocalegaro.dev.br](https://danilocalegaro.dev.br/)