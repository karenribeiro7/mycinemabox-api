const { Router } = require('express');
const { listGenres, createGenre } = require('../controllers/genreController');

const router = Router();

router.get('/genres', listGenres);
router.post('/genres', createGenre);

module.exports = router;