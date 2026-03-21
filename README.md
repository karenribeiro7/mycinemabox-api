# MyCinemaBox 

Aplicacao completa para gerenciamento de filmes e reviews pessoal. Cada usuario possui sua propria lista de filmes, podendo cadastrar, avaliar, comentar e organizar por genero.

O projeto e composto por uma API REST em Node.js e um aplicativo mobile em React Native.

---

## Tecnologias

### Backend
- Node.js
- Express
- Prisma ORM
- SQLite
- JSON Web Token
- Bcryptjs
- Swagger

### App
- React Native
- Expo
- Axios
- React Navigation

---

## Estrutura do projeto

```
mycinemabox/
├── mycinemabox-app/
│   ├── assets/
│   ├── src/
│   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── routes/
│   │   │   └── AppRoutes.js
│   │   ├── screens/
│   │   │   ├── LoginScreen.js
│   │   │   ├── MovieDetailScreen.js
│   │   │   ├── MovieFormScreen.js
│   │   │   ├── MovieListScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   ├── WelcomeScreen.js
│   │   │   └── authMiddleware.js
│   │   ├── service/
│   │   │   └── api.js
│   ├── App.js
│   └── index.js
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

```
DATABASE_URL="file:./dev.db"
```

Crie o banco de dados:

```bash
npx prisma migrate dev
```

Rode o servidor:

```bash
npm run dev
```

A API estara disponivel em `http://localhost:3000`.

### App

Entre na pasta do app:

```bash
cd mycinemabox-app
```

Instale as dependencias:

```bash
npm install
```

Crie o arquivo `.env` na raiz do app com o seguinte conteudo:

```
API_URL=http://SEU_IP:3000/api
```

Para descobrir seu IP rode no terminal:

```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

Rode o app:

```bash
npx expo start
```

Escaneie o QR code com o app Expo Go no celular.

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
| POST | /api/users/register | Cadastra um usuario | Nao |
| POST | /api/users/login | Realiza login e retorna o token | Nao |

### Generos

| Metodo | Rota | Descricao | Autenticacao |
|--------|------|-----------|--------------|
| GET | /api/genres | Lista todos os generos | Sim |
| POST | /api/genres | Cria um genero | Sim - Admin |
| DELETE | /api/genres/:id | Deleta um genero | Sim - Admin |

### Filmes

| Metodo | Rota | Descricao | Autenticacao |
|--------|------|-----------|--------------|
| GET | /api/movies | Lista os filmes do usuario | Sim |
| GET | /api/movies/:id | Busca um filme por ID | Sim |
| POST | /api/movies | Cria um filme | Sim |
| PUT | /api/movies/:id | Atualiza um filme | Sim |
| DELETE | /api/movies/:id | Deleta um filme | Sim |

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
---

## Telas

### Inicial
<img src="mycinemabox-app/assets/foto%201.jpeg" width="250" />

### Login
<img src="mycinemabox-app/assets/foto%202.jpeg" width="250" />

### Cadastro
<img src="mycinemabox-app/assets/foto%203.jpeg" width="250" />

### Lista de Filmes
<img src="mycinemabox-app/assets/foto%204.jpeg" width="250" />

### Formulario de Filme
<img src="mycinemabox-app/assets/foto%205.jpeg" width="250" />

### Detalhe do Filme
<img src="mycinemabox-app/assets/foto%206.jpeg" width="250" />

### Aviso de Exclusao
<img src="mycinemabox-app/assets/foto%207.jpeg" width="250" />
