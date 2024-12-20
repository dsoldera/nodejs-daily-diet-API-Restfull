# nodejs-daily-diet-API-Restfull
An API Restfull to help users create daily diets

## To run the Migrate
- To create the file
- `npm run knex -- migrate:make create-transactions` 

- To run the file
- `npm run knex -- migrate:latest`

- To rollback the changes
- `npm run knex --migrate:rollback `


## Sobre o desafio

Nesse desafio desenvolveremos uma API para controle de dieta diária, a Daily Diet API.

### Regras da aplicação

- [x] Deve ser possível criar um usuário
- [x] Deve ser possível identificar o usuário entre as requisições
- [x] Deve ser possível registrar uma refeição feita, com as seguintes informações:
    *As refeições devem ser relacionadas a um usuário.*
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta
- [x] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [x] Deve ser possível apagar uma refeição
- [x] Deve ser possível listar todas as refeições de um usuário
- [x] Deve ser possível visualizar uma única refeição
- [] Deve ser possível recuperar as métricas de um usuário
    [x]- Quantidade total de refeições registradas
    [x]- Quantidade total de refeições dentro da dieta
    [x]- Quantidade total de refeições fora da dieta
    - Melhor sequência de refeições dentro da dieta
- [x] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

