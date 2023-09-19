# Catalog Microsservice
[<img src="../../docs/images/icons/nodedotjs.svg" width="25px" height="25px" title="Node.js" alt="Node.js"> <img src="../../docs/images/icons/npm.svg" width="25px" height="25px" alt="npm" title="npm"> <img src="../../docs/images/icons/express.svg" width="25px" height="25px" title="Express" alt="Express"> <img src="../../docs/images/icons/sequelize.svg" width="25px" height="25px" alt="Sequelize" title="Sequelize"> <img src="../../docs/images/icons/swagger.svg" width="25px" height="25px" title="Swagger" alt="Swagger"> <img src="../../docs/images/icons/dotenv.svg" width="25px" height="25px" title="Dotenv" alt="Dotenv"> <img src="../../docs/images/icons/redis.svg" width="25px" height="25px" title="Redis" alt="Redis"> <img src="../../docs/images/icons/docker.svg" width="25px" height="25px" alt="Docker" title="Docker"> <img src="../../docs/images/icons/github.svg" width="25px" height="25px" alt="GitHub" title="GitHub"> <img src="../../docs/images/icons/nx.svg" width="25px" height="25px" alt="NX" title="NX"> <img src="../../docs/images/icons/visualstudiocode.svg" width="25px" height="25px" alt="vscode" title="vscode"> <img src="../../docs/images/icons/postgresql.svg" width="25px" height="25px" alt="postgresql" title="postgresql"> ](#projeto-de-estudo-nodejs-e-typescript)

![Badge Status](https://img.shields.io/badge/STATUS-EM_DESENVOLVIMENTO-green)

<!-- [Nx Monorepo for Building Microservices -- Getting started #01](https://www.youtube.com/watch?v=NtdGXeiP9mE)-->

---


<a id="indice"></a>
## :arrow_heading_up: Índice
<!--ts-->

- [Catalog Microsservice](#catalog-microsservice)
  :arrow_heading_up: [Índice](#arrow_heading_up-índice)
  :green_book: [Sobre](#green_book-sobre)
  :bar_chart: [Diagramas](#bar_chart-diagramas)

Para **Decisões Arquiteturais** consulte nosso **[ADR](./ADR.md)**

---
<a id="sobre"></a>
## :green_book: Sobre
Microsserviço responsável pelo gerenciamento do catálogo de filmes, salas de cinema e assentos, bem como pela disponibilização de informações aos clientes sobre filmes, sessões e  ingressos para sessões específicas. 

[:arrow_heading_up: voltar](#indice)

---
<a id="diagrama"></a>
## :bar_chart: Diagramas

**Diagrama de Fluxo:**

```mermaid
graph LR
  subgraph USER FLOW
    F[[Employee User]]
    F --> MAD(Maintain Addresses)
    F --> MFI(Maintain Films)
    F --> MSE(Maintain Sessions)
    F --> MRO(Maintain Rooms)
    F --> MSE(Maintain Seats)
  end

  subgraph Catalog Microsservice
    TIC[Ticket]
    MFI --> FIL[Films]
    MRO --> ROO[Rooms]
    MSE --> SEA[Seats]
    MAD --> ADR[Adresses]
    MSE --> SES[Sessions]
  end

  %% Create associations between steps
    TIC -->|Associate| SES
    SEA -->|Associate| TIC
    SEA -->|Associate| ROO
    ROO -->|Associate| ADR
    FIL -->|Associate| SES
    SES -->|Associate| ROO
```
<br/><br/>

**Diagrama Entidade Relacionamento:**

```mermaid
erDiagram 
    film {
        int id
        UUID uuid
        string description
        int age_rating
        boolean subtitled
        string poster
    }
    session {
        int id
        UUID uuid
        int film_id
        int room_id
        string description
        date date
        timestamptz start_time
        timestamptz end_time
        string time
    }
    room {
        int id
        UUID uuid
        string name
        int capacity
    }
    seat {
        int id
        UUID uuid
        int room_id
        string code
    }
    ticket {
        int id
        UUID uuid
        int session_id
        int seat_id
    }
    address {
        int id
        UUID uuid
        string country
        string state
        string zip_code
        string telephone
        string description
        string postal_code
        string name
    }
    room_address {
        int id
        UUID uuid
        int room_id
        int address_id
    }

    film ||--o{ session : has
    session ||--|| room : occurs
    room ||--|{ seat : has
    session ||--|{ ticket : has
    seat ||--|{ ticket : has
    room ||--|| room_address : located
    room_address ||--|| address : located
```

[:arrow_heading_up: voltar](#indice)
