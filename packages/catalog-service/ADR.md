# ADR 001: Uso do Express com TypeScript, Sequelize e PostgreSQL em um Monorepo NX

---

#### Data: 25.08.2023
#### Status: Aceito
---

### Contexto
Estamos desenvolvendo um Microsserviço para gerenciar o catálogo de ingressos de cinema. Nossa necessidade principal é criar uma API em arquitetura MVC para atender às seguintes demandas:
<br/>
- Gerenciar informações sobre filmes, salas de cinema e sessões.
- Realizar operações de criação, leitura, atualização e exclusão dessas informações.
- Permitir a consulta de informações sobre filmes, salas e sessões.
- Documentar a API para facilitar o uso por outros desenvolvedores.
- Preparar o sistema para possíveis integrações de autenticação no futuro.
- Organizar o código em um Monorepo para facilitar o desenvolvimento e manutenção.
- Armazenar pôsteres de filmes usando um serviço de armazenamento local, simulando um Amazon S3.
- Considerar a implementação de cache com Redis em etapas futuras, visando otimizar o desempenho.




### Decisão
Optamos por estas tecnologias:

1. **Express com TypeScript:** Pela popularidade e facilidade na criação de APIs [RESTful](https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf), com tipagem estática para desenvolvimento seguro e eficiente.
2. **Padrão MVC:** Pela simplicidade na estruturação da aplicação.
3. **Testes Unitários (TDD):** Para garantir a qualidade do código desde o início com [Jest](https://jestjs.io/pt-BR/).
4. **ORM Sequelize:** Pela facilidade de interação com o [PostgreSQL](https://www.postgresql.org/), gerando consultas SQL automaticamente.
5. **Banco de Dados PostgreSQL:** Pela confiabilidade e capacidade de lidar com volumes significativos.
6. **Abordagem RESTful com HATEOAS:** Para validar a hipótese de componentes reativos no front-end.
7. **Swagger:** Para facilitar a documentação e a colaboração entre times.
8. **Simular S3 storage** [ceph](https://docs.ceph.com/en/latest/radosgw/s3/) para simular storage local
9. **Sem Autenticação Inicial:** Planejamos integrar [Keycloak](https://www.keycloak.org/) posteriormente.
10. **Cache Futuro:** Não usaremos cache inicialmente, mas discutiremos o uso do [Redis](https://redis.io/) no futuro.



### Motivação
- **Eficiência no Desenvolvimento:** A combinação [Express](https://expressjs.com/) e [TypeScript](https://www.typescriptlang.org/) proporcionará eficiência na criação de APIs seguras e fáceis de manter.
- **Abstração de Banco de Dados:** O [Sequelize](https://sequelize.org/) simplifica o acesso ao [PostgreSQL](https://www.postgresql.org/), permitindo focar na lógica de negócios.
- **Performance e Escalabilidade:** O [PostgreSQL](https://www.postgresql.org/) oferece desempenho e escalabilidade.
- **Organização e Manutenção:** O [Monorepo NX](https://nx.dev/) oferece estrutura para projetos relacionados.



### Consequências
- A escolha requer familiaridade com [Express](https://expressjs.com/) e [Sequelize](https://sequelize.org/).
- A arquitetura proposta visa desenvolvimento ágil e seguro, demandando atenção à modelagem e design da API.



### Conclusão
A escolha de [Express](https://expressjs.com/), [TypeScript](https://www.typescriptlang.org/), [Sequelize](https://sequelize.org/) e [PostgreSQL](https://www.postgresql.org/) em um [Monorepo NX](https://nx.dev/) foi feita considerando eficiência, abstração de banco de dados, performance e organização. Essa escolha visa atender aos requisitos de forma eficaz e escalável.
