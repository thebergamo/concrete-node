concrete-node
===

[![Build Status](https://travis-ci.org/thebergamo/concrete-node.svg)](https://travis-ci.org/thebergamo/concrete-node)
[![Coverage Status](https://coveralls.io/repos/github/thebergamo/concrete-node/badge.svg?branch=master)](https://coveralls.io/github/thebergamo/concrete-node?branch=master)

### Como rodar?
Para iniciar a API é preciso realizar os seguintes passos:
* Instalar o Node(v5.0.0 ou superior)
* Instalar MongoDB (v3.2.3 ou superior)
* `cp .envsample .env`
* Setar a váriavel MONGO_URI no arquivo `.env` para uma connectionString do mongo válida.
* Setar corretamente outras váriaveis incluidas no arquivo `.env` (e.g `.envsample`)
* `npm start`

### Como testar?
Para que os testes possam funcionar, é preciso realizar os seguintes passos:
* Setar corretamente as váriaveis no arquivo .env
* `npm test`

### Deployed
Está configurado o deploy automático via Heroku e é possível testar as specs abaixo neste [link](https://cs-concrete.herokuapp.com/).

### API
#### POST /sign_up
**Overview**: POST /sign_up deverá criar um usuário  
**Parâmetros**: Todos os parâmetros são obrigatórios.
- **nome** - O nome do usuário.
- **senha** - A senha do usuário.
- **email** - O email do usuário.
- **telefones** - O campo telefones, é um array de objetos com os seguintes campos.  
    * **numero** - O número do telefone (8/9 digitos).
    * **ddd** - O ddd do telefone (2/3 digitos).
    
**request**
```
POST /sign_up
```

**body**
```json
{
    "nome": "Marcos",
    "email": "eisto@gmail.com",
    "senha": "abcdefg",
    "telefones": [{
        "numero": "111111111",
        "ddd": "11"
    }]
}
```

**output**
```json
{
  "nome": "Marcos",
  "email": "mark@gmail.com",
  "ultimo_login": "2016-05-12T14:35:37.246Z",
  "data_atualizacao": "2016-05-12T14:35:37.246Z",
  "data_criacao": "2016-05-12T14:35:37.246Z",
  "telefones": [
    {
      "numero": "111111111",
      "ddd": "11"
    }
  ],
  "id": "1df227a3-5c41-4c73-b6d2-fc599a6bbd13",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkZjIyN2EzLTVjNDEtNGM3My1iNmQyLWZjNTk5YTZiYmQxMyIsImxhc3RfbG9naW4iOiIyMDE2LTA1LTEyVDE0OjM1OjM3LjI0NloiLCJpYXQiOjE0NjMwNjM3MzcsImV4cCI6MTQ2MzA2NTUzN30.382U0AR-F2tVHteO0FDvxITmsRU3Ybj0VMVA6ILGQtA"
}
```

#### POST /sign_in
**Overview**: POST /sign_up deverá realizar a autenticação usuário  
**Parâmetros**: Todos os parâmetros são obrigatórios.
- **email** - O email do usuário.
- **senha** - A senha do usuário.
    
**request**
```
POST /sign_in
```
**body**
```json
{
    "email": "eisto@gmail.com",
    "senha": "abcdefg"
}
```
**output**
```json
{
  "nome": "Marcos",
  "email": "mark@gmail.com",
  "ultimo_login": "2016-05-12T14:35:37.246Z",
  "data_atualizacao": "2016-05-12T14:35:37.246Z",
  "data_criacao": "2016-05-12T14:35:37.246Z",
  "telefones": [
    {
      "numero": "111111111",
      "ddd": "11"
    }
  ],
  "id": "1df227a3-5c41-4c73-b6d2-fc599a6bbd13",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkZjIyN2EzLTVjNDEtNGM3My1iNmQyLWZjNTk5YTZiYmQxMyIsImxhc3RfbG9naW4iOiIyMDE2LTA1LTEyVDE0OjM1OjM3LjI0NloiLCJpYXQiOjE0NjMwNjM3MzcsImV4cCI6MTQ2MzA2NTUzN30.382U0AR-F2tVHteO0FDvxITmsRU3Ybj0VMVA6ILGQtA"
}
```

#### GET /buscar_usuario
**Overview**: GET /buscar_usuario deverá buscar um usuário  
   
**request**
```
GET /buscar_usuario
```
**headers**
```
Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkZjIyN2EzLTVjNDEtNGM3My1iNmQyLWZjNTk5YTZiYmQxMyIsImxhc3RfbG9naW4iOiIyMDE2LTA1LTEyVDE0OjM1OjM3LjI0NloiLCJpYXQiOjE0NjMwNjM3MzcsImV4cCI6MTQ2MzA2NTUzN30.382U0AR-F2tVHteO0FDvxITmsRU3Ybj0VMVA6ILGQtA
```
**output**
```json
{
  "nome": "Marcos",
  "email": "eisto@gmail.com",
  "ultimo_login": "2016-05-12T14:35:37.246Z",
  "data_atualizacao": "2016-05-12T14:35:37.246Z",
  "data_criacao": "2016-05-12T14:35:37.246Z",
  "telefones": [
    {
      "numero": "111111111",
      "ddd": "11"
    }
  ],
  "id": "1df227a3-5c41-4c73-b6d2-fc599a6bbd13"
}
```

#### Erros
O formato para erros é o seguinte: `{ "mensagem": "MENSAGEM DE ERRO" }`, as mensagens pode vir em um objeto único ou um array com mensagens.

#### Status code
**SUCESSO**

**200** - OK  
**201** - Recurso Criado  

**ERROS**

**400** - Requisição com problema  
- **Possível resposta:** Objeto ou Array com mensagens de erro.   

**401** - Sem autorização 
- **Possível resposta:** `{ "mensagem": "Usuário e/ou senha inválidos" }` 

**403** - Acesso Negado   
- **Possível resposta:** `{ "mensagem": "Não autorizado" }` 

**500** - Erro Interno
 - **Possível resposta:** `{ "mensagem": "MENSAGEM DE ERRO INTERNA" }` 

## Desafio

# Desafio node.js Concrete Solutions

Crie um aplicativo backend que exporá uma API RESTful de criação de sing up/sign in.

Todos os endpoints devem somente aceitar e somente enviar JSONs. O servidor deverá retornar JSON para os casos de endpoint não encontrado também.

O aplicativo deverá persistir os dados (ver detalhes em requisitos).

Todas as respostas de erro devem retornar o objeto:

`{ "mensagem": "mensagem de erro" }`

Segue a documentação dos endpoints:

### Criação de cadastro

- Este endpoint deverá receber um usuário com os seguintes campos: nome, email, senha e uma lista de objetos telefone. Seguem os modelos:

```javascript
  { "nome": "string",
    "email": "string",
    "senha": "senha",
    "telefones": [
       {
         "numero": "123456789",
         "ddd": "11"
       }
    ]
  }
```
  
- Usar status codes de acordo
- Em caso de sucesso irá retornar um usuário mais os campos:
  - `id`: id do usuário (pode ser o próprio gerado pelo banco, porém seria interessante se fosse um GUID)
  - `data_criacao`: data da criação do usuário
  - `data_atualizacao`: data da última atualização do usuário
  - `ultimo_login`: data do último login (no caso da criação, será a mesma que a criação)
  - `token`: token de acesso da API (pode ser um GUID ou um JWT)
- Caso o e-mail já exista, deverá retornar erro com a mensagem "E-mail já existente".
- O token deverá ser persistido junto com o usuário

### Sign in

- Este endpoint irá receber um objeto com e-mail e senha.
- Caso o e-mail exista e a senha seja a mesma que a senha persistida, retornar igual ao endpoint de sign_up.
- Caso o e-mail não exista, retornar erro com status apropriado mais a mensagem "Usuário e/ou senha inválidos"
- Caso o e-mail exista mas a senha não bata, retornar o status apropriado 401 mais a mensagem "Usuário e/ou senha inválidos"

### Buscar usuário

- Chamadas para este endpoint devem conter um header na requisição de Authentication com o valor "Bearer {token}" onde {token} é o valor do token passado na criação ou sign in de um usuário.
- Caso o token não exista, retornar erro com status apropriado com a mensagem "Não autorizado".
- Caso o token exista, buscar o usuário pelo user_id passado no path e comparar se o token no modelo é igual ao token passado no header.
- Caso não seja o mesmo token, retornar erro com status apropriado e mensagem "Não autorizado"
- Caso seja o mesmo token, verificar se o último login foi a MENOS que 30 minutos atrás.
- Caso não seja a MENOS que 30 minutos atrás, retornar erro com status apropriado com mensagem "Sessão inválida".
- Caso tudo esteja ok, retornar o usuário.

## Requisitos

- persitência de dados
- Sistema de build
    Gestão de dependências via gerenciador de pacotes
    Utilizar um task runner para realização de build
- Padronização de estilo de código em tempo de build - sugestão: jsHint/jsLint
- API: Express

## Requisitos desejáveis

- JWT como token
- Testes unitários
- Criptogafia não reversível (hash) na senha e no token

