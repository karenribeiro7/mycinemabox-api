const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Cinema Box - Catalogo de Filmes",
      version: "1.0.0",
      description: "API REST para gerenciamento de um catalogo de filmes",
    },
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
 */

/**
 * @swagger
 * /genres:
 *   get:
 *     summary: Lista todos os generos
 *     tags: [Genres]
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Genero criado com sucesso
 *       400:
 *         description: Nome e obrigatorio
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Lista todos os filmes
 *     tags: [Movies]
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
 *       409:
 *         description: Filme ja cadastrado
 */

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Busca um filme por ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Filme encontrado
 *       404:
 *         description: Filme nao encontrado
 *   put:
 *     summary: Atualiza um filme
 *     tags: [Movies]
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
 *       404:
 *         description: Filme nao encontrado
 *   delete:
 *     summary: Deleta um filme
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Filme deletado com sucesso
 *       404:
 *         description: Filme nao encontrado
 */