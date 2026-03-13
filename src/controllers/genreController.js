const prisma = require('../database/prismaClient');

async function listGenres(req, res) {
    const genres = await prisma.genre.findMany();
    res.json(genres);
}

async function createGenre(req, res) {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Nome do genero eh obrigatorio' });
    }

    const genreExists = await prisma.genre.findFirst({
        where: {
            name,
        },
    });

    if (genreExists) {
        return res.status(400).json({ error: 'Genero ja existe' });
    }

    const genre = await prisma.genre.create({
        data: {
            name,
        },
    });
    res.status(201).json(genre);
}

module.exports = {
    listGenres,
    createGenre,
};