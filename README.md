# nodejs-daily-diet-API-Restfull
An API Restfull to help users create daily diets

## Sobre o desafio

<aside>
⚠️ A partir desse desafio **não** vamos informar detalhadamente rotas e propriedades dos registros a serem criadas, mas sim, as regras e requisitos que a API deve ter.

O motivo disso é para vocês **também** exercitarem ****o desenvolvimento e a estruturação dessa parte.

</aside>

Nesse desafio desenvolveremos uma API para controle de dieta diária, a Daily Diet API.

### Regras da aplicação

- [] Deve ser possível criar um usuário
- [] Deve ser possível identificar o usuário entre as requisições
- [] Deve ser possível registrar uma refeição feita, com as seguintes informações:
    
    *As refeições devem ser relacionadas a um usuário.*
    
    - Nome
    - Descrição
    - Data e Hora
    - Está dentro ou não da dieta
- [] Deve ser possível editar uma refeição, podendo alterar todos os dados acima
- [] Deve ser possível apagar uma refeição
- [] Deve ser possível listar todas as refeições de um usuário
- [] Deve ser possível visualizar uma única refeição
- [] Deve ser possível recuperar as métricas de um usuário
    - Quantidade total de refeições registradas
    - Quantidade total de refeições dentro da dieta
    - Quantidade total de refeições fora da dieta
    - Melhor sequência de refeições dentro da dieta
- [] O usuário só pode visualizar, editar e apagar as refeições o qual ele criou

É comum ao estar desenvolvendo uma API, imaginar como esses dados vão estar sendo utilizados pelo cliente web e/ou mobile.

Por isso, deixamos abaixo o link para o layout da aplicação que utilizaria essa API.

https://www.figma.com/design/4nIhe1PxI6ZvwR8xsIqfwH/Daily-Diet-%E2%80%A2-Desafio-React-Native-(Community)-(Copy)?node-id=2-12&node-type=canvas&t=IQF0LIddeipfWAGm-0