const prisma = require("../database/prismaClient");

async function listMovies(req, res) {
  const movies = await prisma.movie.findMany({
    where: { userId: req.userId },
    include: { genre: true },
  });
  res.json(movies);
}

async function getMovie(req, res) {
  const { id } = req.params;

  const movie = await prisma.movie.findFirst({
    where: {
      id: Number(id),
      userId: req.userId,
    },
    include: { genre: true },
  });

  if (!movie) {
    return res.status(404).json({ error: "Filme nao encontrado" });
  }

  res.json(movie);
}

async function createMovie(req, res) {
  const { title, synopsis, year, rating, genreId, comment } = req.body;

  if (!title || !synopsis || !year || !rating || !genreId) {
    return res.status(400).json({ error: "Todos os campos sao obrigatorios" });
  }

  const movieAlreadyExists = await prisma.movie.findFirst({
    where: {
      title,
      userId: req.userId,
    },
  });

  if (movieAlreadyExists) {
    return res.status(409).json({ error: "Filme ja cadastrado" });
  }

  const movie = await prisma.movie.create({
    data: {
      title,
      synopsis,
      year: Number(year),
      rating: Number(rating),
      genreId: Number(genreId),
      comment,
      userId: Number(req.userId),
    },
  });

  res.status(201).json(movie);
}

async function updateMovie(req, res) {
  const { id } = req.params;
  const { title, synopsis, year, rating, genreId, comment } = req.body;

  const movie = await prisma.movie.findFirst({
    where: {
      id: Number(id),
      userId: req.userId,
    },
  });

  if (!movie) {
    return res.status(404).json({ error: "Filme nao encontrado" });
  }

  const updatedMovie = await prisma.movie.update({
    where: { id: Number(id) },
    data: {
      title,
      synopsis,
      year: Number(year),
      rating: Number(rating),
      genreId: Number(genreId),
      comment,
    },
  });

  res.json(updatedMovie);
}

async function deleteMovie(req, res) {
  const { id } = req.params;

  const movie = await prisma.movie.findFirst({
    where: {
      id: Number(id),
      userId: req.userId,
    },
  });

  if (!movie) {
    return res.status(404).json({ error: "Filme nao encontrado" });
  }

  await prisma.movie.delete({
    where: { id: Number(id) },
  });

  res.status(204).send();
}

module.exports = { listMovies, getMovie, createMovie, updateMovie, deleteMovie };