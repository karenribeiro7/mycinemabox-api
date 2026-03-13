const { Router } = require('express');
const { listGenres, createGenre } = require('../controllers/genreController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.get('/genres', listGenres);
router.post('/genres', authMiddleware, createGenre);

module.exports = router;