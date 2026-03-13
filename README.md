# MyCinemaBox - Catalogo de Filmes

API REST para gerenciamento de um catalogo de filmes, permitindo cadastrar, listar, atualizar e deletar filmes e generos. A API tem autenticacao JWT para proteger as rotas de escrita.

---

## Tecnologias

- Node.js
- Express
- Prisma ORM
- SQLite
- JSON Web Token
- Bcryptjs
- Swagger

---

## Estrutura do projeto

```
mycinemabox/
├── prisma/
│   ├── schema.prisma
│   └── dev.db
├── src/
│   ├── controllers/
│   │   ├── movieController.js
│   │   ├── genreController.js
│   │   └── userController.js
│   ├── routes/
│   │   ├── movieRoutes.js
│   │   ├── genreRoutes.js
│   │   └── userRoutes.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── database/
│   │   └── prismaClient.js
│   ├── docs/
│   │   └── swagger.js
│   └── app.js
├── server.js
├── .env
└── package.json
```

---

## Setup

Clone o repositorio:

```bash
git clone https://github.com/seu-usuario/mycinemabox.git
cd mycinemabox
```

Instale as dependencias:

```bash
npm install
```

Crie o arquivo `.env` na raiz do projeto com o seguinte conteudo:

\```
DATABASE_URL="file:./dev.db"
\```

Crie o banco de dados:

```bash
npx prisma migrate dev
```

Rode o servidor:

```bash
npm run dev
```

A API estara disponivel em `http://localhost:3000`.

---

## Autenticacao

As rotas de escrita exigem autenticacao via token JWT. Para obter o token, cadastre um usuario e faca login. O token deve ser enviado no header de cada requisicao protegida:

```
Authorization: Bearer token_jwt
```

---

## Endpoints

### Usuarios

| Metodo | Rota | Descricao | Autenticacao |
|--------|------|-----------|--------------|
| POST | /users/register | Cadastra um usuario | Nao |
| POST | /users/login | Realiza login e retorna o token | Nao |

### Generos

| Metodo | Rota | Descricao | Autenticacao |
|--------|------|-----------|--------------|
| GET | /genres | Lista todos os generos | Nao |
| POST | /genres | Cria um genero | Sim |

### Filmes

| Metodo | Rota | Descricao | Autenticacao |
|--------|------|-----------|--------------|
| GET | /movies | Lista todos os filmes | Nao |
| GET | /movies/:id | Busca um filme por ID | Nao |
| POST | /movies | Cria um filme | Sim |
| PUT | /movies/:id | Atualiza um filme | Sim |
| DELETE | /movies/:id | Deleta um filme | Sim |

---

## Documentacao

A documentacao da API foi feita com Swagger e pode ser acessada pelo navegador apos rodar o servidor.

Acesse em:

```
http://localhost:3000/api-docs
```

Na interface do Swagger e possivel visualizar todos os endpoints disponiveis, os campos obrigatorios de cada requisicao e testar a API diretamente pelo navegador sem precisar de ferramentas externas como Insomnia ou Postman.

Para testar os endpoints protegidos, clique no botao `Authorize` e informe o token recebido no login no seguinte formato:

```
Bearer token_jwt
```
