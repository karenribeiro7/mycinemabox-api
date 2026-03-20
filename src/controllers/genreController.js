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

async function deleteGenre(req, res) {
    const { id } = req.params;

    const genre = await prisma.genre.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!genre) {
        return res.status(404).json({ error: 'Genero nao encontrado' });
    }

    await prisma.genre.delete({
        where: {
            id: parseInt(id),
        },
    });

    res.status(200).json({ message: 'Genero deletado com sucesso' });
}

module.exports = {
    listGenres,
    createGenre,
    deleteGenre,
};