const { Router } = require('express');
const { listMovies, createMovie, deleteMovie, updateMovie, getMovie } = require('../controllers/movieController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.get('/movies', listMovies);
router.post('/movies', authMiddleware, createMovie);
router.get('/movies/:id', getMovie);
router.put('/movies/:id', authMiddleware, updateMovie);
router.delete('/movies/:id', authMiddleware, deleteMovie);

module.exports = router;