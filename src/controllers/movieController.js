const prisma = require('../database/prismaClient');

async function listMovies(req, res) {
    const movies = await prisma.movie.findMany({
        include: {
            genre: true,
        },
    });
    res.json(movies);
}

async function createMovie(req, res) {
    const { title, synopsis, year, genreId, rating, comment } = req.body;

    if (!title || !synopsis || !year || !genreId || !rating || !comment) {
        return res.status(400).json({ error: 'Todos os campos sao obrigatorios' });
    }

    const movieExists = await prisma.movie.findFirst({
        where: {
            title,
        },
    });

    if (movieExists) {
        return res.status(400).json({ error: 'Filme ja existe' });
    }

    const movie = await prisma.movie.create({
        data: {
            title,
            synopsis,
            year,
            genreId,
            rating,
            comment,
        },
    });
    res.status(201).json(movie);
}

async function deleteMovie(req, res) {
    const { id } = req.params;

    const movie = await prisma.movie.delete({
        where: {
            id: Number(id),
        },
    });
    res.status(204).send();
}

async function updateMovie(req, res) {
    const { id } = req.params;
    const { title, synopsis, year, genreId, rating, genre, comment } = req.body;

    const movie = await prisma.movie.update({
        where: {
            id: Number(id),
        },
        data: {
            title,
            synopsis,
            year,
            genreId,
            rating,
            genre,
            comment,
        },
    });
    res.json(movie);
}

async function getMovie(req, res) {
    const { id } = req.params;
    const movie = await prisma.movie.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            genre: true,
        },
    });

    if (!movie) {
        return res.status(404).json({ error: 'Filme nao encontrado' });
    }
    res.json(movie);
}

module.exports = {
    listMovies,
    createMovie,
    deleteMovie,
    updateMovie,
    getMovie
}