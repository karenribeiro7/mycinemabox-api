const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Cinema Box - Catalogo de Filmes",
      version: "1.0.0",
      description: "API REST para gerenciamento de um catalogo de filmes",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    }
  },
  apis: ["./src/docs/swagger.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *     Movie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         synopsis:
 *           type: string
 *         year:
 *           type: integer
 *         rating:
 *           type: number
 *         genreId:
 *           type: integer
 *         comment:
 *           type: string
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Cadastra um novo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario cadastrado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Todos os campos sao obrigatorios
 *       409:
 *         description: Email ja cadastrado
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Realiza o login e retorna o token JWT
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Todos os campos sao obrigatorios
 *       401:
 *         description: Email ou senha invalidos
 */

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Lista todos os generos
 *     tags: [Genres]
 *     security:
 *     - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de generos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *   post:
 *     summary: Cria um genero
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Genero criado com sucesso
 *       400:
 *         description: Nome e obrigatorio
 *       401:
 *         description: Token nao informado ou invalido
 */
/** 
 * @swagger
 * /api/genres/{id}:
 *   delete:
 *     summary: Deleta um genero
 *     tags: [Genres]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Genero deletado com sucesso
 *       401:
 *         description: Token nao informado ou invalido
 *       404:
 *         description: Genero nao encontrado

 */

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Lista todos os filmes
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de filmes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Movie'
 *   post:
 *     summary: Cria um filme
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - synopsis
 *               - year
 *               - rating
 *               - genreId
 *             properties:
 *               title:
 *                 type: string
 *               synopsis:
 *                 type: string
 *               year:
 *                 type: integer
 *               rating:
 *                 type: number
 *               genreId:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Filme criado com sucesso
 *       400:
 *         description: Campos obrigatorios faltando
 *       401:
 *         description: Token nao informado ou invalido
 *       409:
 *         description: Filme ja cadastrado
 */

/**
 * @swagger
 * /api/movies/{id}:
 *   get:
 *     summary: Busca um filme por ID
 *     tags: [Movies]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filme encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Movie'
 *       404:
 *         description: Filme nao encontrado
 *   put:
 *     summary: Atualiza um filme
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               synopsis:
 *                 type: string
 *               year:
 *                 type: integer
 *               rating:
 *                 type: number
 *               genreId:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 *       401:
 *         description: Token nao informado ou invalido
 *       404:
 *         description: Filme nao encontrado
 *   delete:
 *     summary: Deleta um filme
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Filme deletado com sucesso
 *       401:
 *         description: Token nao informado ou invalido
 *       404:
 *         description: Filme nao encontrado
 */