# MyCinemaBox - Catalogo de Filmes

API REST para gerenciamento de um catalogo de filmes, permitindo cadastrar, listar, atualizar e deletar filmes e generos.

---

## Tecnologias

- Node.js
- Express
- Prisma ORM
- SQLite

---

## Estrutura do projeto

```
catalogo-filmes/
├── prisma/
│   ├── schema.prisma
│   └── dev.db
├── src/
│   ├── controllers/
│   │   ├── movieController.js
│   │   └── genreController.js
│   ├── routes/
│   │   ├── movieRoutes.js
│   │   └── genreRoutes.js
│   ├── database/
│   │   └── prismaClient.js
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

## Endpoints

### Generos

| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | /genres | Lista todos os generos |
| POST | /genres | Cria um genero |

### Filmes

| Metodo | Rota | Descricao |
|--------|------|-----------|
| GET | /movies | Lista todos os filmes |
| GET | /movies/:id | Busca um filme por ID |
| POST | /movies | Cria um filme |
| PUT | /movies/:id | Atualiza um filme |
| DELETE | /movies/:id | Deleta um filme |

---

## Documentacao

A documentacao da API foi feita com Swagger e pode ser acessada pelo navegador apos rodar o servidor.

Acesse em:

```
http://localhost:3000/api-docs
```

Na interface do Swagger e possivel visualizar todos os endpoints disponiveis, os campos obrigatorios de cada requisicao e testar a API diretamente pelo navegador sem precisar de ferramentas externas como Insomnia ou Postman.
