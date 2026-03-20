const { Router } = require('express');
const { listGenres, createGenre, deleteGenre } = require('../controllers/genreController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router = Router();

router.get('/genres', authMiddleware, listGenres);
router.post('/genres', authMiddleware, adminMiddleware, createGenre);
router.delete('/genres/:id', authMiddleware, adminMiddleware, deleteGenre);

module.exports = router;