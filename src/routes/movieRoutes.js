const { Router } = require('express');
const { listMovies, createMovie, deleteMovie, updateMovie, getMovie } = require('../controllers/movieController');
const router = Router();

router.get('/movies', listMovies);
router.post('/movies', createMovie);
router.get('/movies/:id', getMovie);
router.put('/movies/:id', updateMovie);
router.delete('/movies/:id', deleteMovie);

module.exports = router;