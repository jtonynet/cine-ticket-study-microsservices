
# Estudo de Microsservices para Venda de Ingressos - CineTicket
[<img src="./docs/images/logo.png"> <br/> <img src="./docs/images/icons/nginx.svg" width="25px" height="25px" title="Nginx" alt="Nginx"> <img src="./docs/images/icons/nodedotjs.svg" width="25px" height="25px" title="Node.js" alt="Node.js"> <img src="./docs/images/icons/npm.svg" width="25px" height="25px" alt="npm" title="npm"> <img src="./docs/images/icons/express.svg" width="25px" height="25px" title="Express" alt="Express"> <img src="./docs/images/icons/docker.svg" width="25px" height="25px" alt="Docker" title="Docker"> <img src="./docs/images/icons/github.svg" width="25px" height="25px" alt="GitHub" title="GitHub"> <img src="./docs/images/icons/nx.svg" width="25px" height="25px" alt="NX" title="NX"> <img src="./docs/images/icons/visualstudiocode.svg" width="25px" height="25px" alt="vscode" title="vscode"> <img src="./docs/images/icons/bootstrap.svg" width="25px" height="25px" alt="bootstrap" title="bootstrap"> <img src="./docs/images/icons/jquery.svg" width="25px" height="25px" alt="jquery" title="jquery">](#projeto-de-estudo-nodejs-e-typescript) <!-- icons by https://simpleicons.org/?q=types -->

![Badge Status](https://img.shields.io/badge/STATUS-EM_DESENVOLVIMENTO-green)


---

<a id="indice"></a>
## :arrow_heading_up: Índice
<!--ts-->

- [Estudo de Microsservices para Venda de Ingressos - CineTicket](#estudo-de-microsservices-para-venda-de-ingressos---cineticket)
  - [:arrow\_heading\_up: Índice](#arrow_heading_up-índice)
  - [:green\_book: Sobre](#green_book-sobre)
  - [:camera: Imagens](#camera-imagens)
  - [:computer: Instalação](#computer-instalação)
  - [:bar\_chart: Diagramas](#bar_chart-diagramas)
  - [:hammer: Ferramentas](#hammer-ferramentas)
  - [:clap: Boas Práticas](#clap-boas-práticas)
  - [:nerd\_face: Para Desenvolvedores](#nerd_face-para-desenvolvedores)
  - [:1234: Versões](#1234-versões)

<!--te-->
---
<a id="sobre"></a>
## :green_book: Sobre

Monorepo para estudo de arquitetura de venda de ingressos similar ao video ["Como fazer o ingressos.x escalar?"](https://www.youtube.com/watch?v=0TMr8rsmU-k)

Não busco as melhores soluções nem o cenário perfeito (tudo sempre tem trade-offs). Pretendo resolver questões específicas e criar "APIs Mock" para serviços, com o objetivo de validar hipóteses e aos poucos escalar para algo totalmente funcional.

Isso é um laboratório de utilização de serviços para solucionar os dois principais problemas propostos pelo video:
1. Como escalar uma funcionalidade que possui um gargalo do lado do principal fornecedor (a API de reserva de tickets).
2. Criar uma "antesala" que impeça um "flood" de requisições semelhante a um ataque DDoS.

Além dos mencionados, trabalhar com consistência eventual e implementar um conjunto de "rollbacks" de reserva caso ocorram falhas no pagamento ou na reserva (nas APIs externas "mock"). Tentar evoluir a solução para algo semelhante ao padrão de saga.

Devo criar o projeto aumentando aos poucos seu escopo do zero ao deploy.

Foi utilizado o [template bootstrap gratuito FlixGo](https://www.templateshub.net/template/FlixGo-Online-Movies-Template), algumas alterações serão necessárias, pois o mesmo foi elaborado tendo sistemas de streaming em mente. A princípio, usando JavaScript puro para chamadas de API, aos poucos sendo alteradas para componentes React, aproveitando a versatilidade do gerenciador de monorepos Nx.

Pretendo construir os serviços do sistema distribuído em Node.js e Go e utilizar [Architecture decision record (ADR)](https://github.com/joelparkerhenderson/architecture-decision-record) para justificar as tomadas de decisão.

[:arrow_heading_up: voltar](#indice)

---

<a id="imagens"></a>
## :camera: Imagens
Projeto rodando local
<img src="./docs/images/project.png" alt="Projeto rodando local" title="Projeto rodando local"> 

<br>

[:arrow_heading_up: voltar](#indice)

---

<a id="instalacao"></a>
## :computer: Instalação

Para executar o projeto, siga as instruções abaixo:

1. Faça o download/clone do repositório do projeto.
2. Certifique-se de ter o Docker Compose instalado em sua máquina.
3. Execute na raiz do projeto, o comando `docker-compose up` ou `docker compose up`, dependendo da versão do Docker Compose instalada.
4. Acesse `http://localhost:8080` em seu navegador para visualizar o projeto.

[:arrow_heading_up: voltar](#indice)

---

<a id="diagrama"></a>
## :bar_chart: Diagramas

O diagrama abaixo ilustra a uma **proposta** de arquitetura para o projeto:

```mermaid
graph LR

subgraph USER FLOW
  A[[Web Client]] -->|HTTP| B(front-site catalog view)
  A -->|HTTP| D(front-site authentication)
  D -->|HTTP| C(front-site purchase)
end

subgraph BACKEND
  subgraph API
    B -->|HTTP| E[catalog-service]
    C -->|HTTP| N[orchestration-service]
    N -->|GRPC| F[checkout-service]
    N -->|GRPC| L[ticket-reservation-service]
    D <-->|HTTP| O[authorization-service]
  end
  
  subgraph DATABASE
    H[(catalog-service DB)] <-->| | E
    K[(checkout-service DB)] <-->| | F
    P[(authorization-service DB)] <-->| | O
    Q[(ticket-reservation-service DB)] <-->| | L
  end
  
  subgraph CACHE
    E <-->| | R([redis-catalog-cache])
  end

  subgraph MOCK-EXTERNAL-APIs
    F -->|HTTP| G[mock-payment-gateway-x-service]
    L -->|HTTP| M[mock-provider-x-reservation-slow-service]
  end
end
``` 

<br>
<details>
<summary>O fluxo de interações para o usuário comprar um assento de um filme que esteja sendo exibido, com base no diagrama fornecido, é o seguinte:</summary>
<br/>
<ol>
  <li>
    Acesso à visualização do cine-ticket-front-site: O usuário pode acessar a interface de visualização do cine-ticket-front-site (representado pela seta "Cliente Web" -> "cine-ticket-front-site visualizacao").
  </li>
  <li>
    Autenticação no cine-ticket-front-site: O usuário pode realizar o processo de autenticação no cine-ticket-front-site (representado pela seta "Cliente Web" -> "cine-ticket-front-site autenticacao" -> "cine-ticket-user-auth-api").
  </li>
  <li>
    Compra no cine-ticket-front-site: Após a autenticação, o usuário pode prosseguir com a compra no cine-ticket-front-site (representado pela seta "Cliente Web" -> "cine-ticket-front-site compra" -> "cine-ticket-orchestration-api" -> "cine-ticket-checkout-api" -> "mock-gateway-pagamento-api" e "cine-ticket-confirma-reserva" -> "mock-parceiro-reserva-lento-api").
  </li>
</ol>
<br>
  Dessa forma, o fluxo completo de interações envolve o cliente web interagindo com as APIs de exibição, autenticação. As APIs de checkout e reserva devem ser orquestradas por uma outra API ainda a definir, responsável pelo processo de roolback em caso de falhas.
</details>
<br/>

[:arrow_heading_up: voltar](#indice)

---

<a id="ferramentas"></a>
## :hammer: Ferramentas
As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [npm](https://www.npmjs.com/)
- [Nx](https://nx.dev/)
- [Docker](https://www.docker.com/)

[:arrow_heading_up: voltar](#indice)

---

<a id="boas-praticas"></a>
## :clap: Boas Práticas
Seguindo boas práticas de desenvolvimento:
- [Semantic Versioning 2.0.0](https://semver.org/spec/v2.0.0.html)
- [keep a changelog](https://keepachangelog.com/en/1.0.0/)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [Mermaid Diagrams](https://mermaid.js.org)
- [Monorepo](https://monorepo.tools/)
- [Architecture decision record (ADR)](https://github.com/joelparkerhenderson/architecture-decision-record)

[:arrow_heading_up: voltar](#indice)

---
<a id="desenvolvedores"></a>
## :nerd_face: Para Desenvolvedores
Nada do que for discutido nessa seção deve atrapalhar o [correto funcionamento e instalação](#computer-instalação) do projeto em uma máquina com o docker-compose funcional

Durante o estudo/desenvolvimento, foram adotadas as ferramentas [Nx](https://nx.dev/) (que requer Nodejs em sua máquina) e seu [console no VScode](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console) para a gestão de Monorepos. Para uma experiência de desenvolvimento e validação técnica do repositório, [sugiro instalação do ambiente de gerenciamento](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). Explicar o funcionamento do Nx não é o objetivo do presente documento (até mesmo porque também estou aprendendo), mas [encorajo a buscar esses dados](https://nx.dev/getting-started/intro) caso deseje. [Qualquer Monorepo pode se tornar um monorepo Nx](https://blog.nrwl.io/adding-nx-to-an-existing-monorepo-by-running-one-command-426fa519d943).

Tenha bons estudos :)
<!-- `npx nx dep-graph` é MARAVILHOSO -->
[:arrow_heading_up: voltar](#indice)

---

<a id="versionamento"></a>
## :1234: Versões
Para obter mais informações, consulte o [Histórico de Versões](./CHANGELOG.md).

[:arrow_heading_up: voltar](#indice)

